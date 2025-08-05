class AppTender extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.liked = [];
    this.disliked = [];
    this.currentIndex = 0;
    this.swipeThreshold = 50;

    // Touch tracking
    this.isDragging = false;
    this.startX = 0;
    this.startY = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.offsetX = 0;
    this.offsetY = 0;

    // Data
    this.players = [
      // 10 người dùng nữ mới
      {
        id: 11,
        name: "Nguyễn Thị Mai",
        age: 22,
        location: "Hà Nội",
        bio: "Yêu thích thời trang và cà phê cuối tuần.",
        photos: [
          "https://plus.unsplash.com/premium_photo-1668896123985-edc26d57cab3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
        interests: ["Thời trang", "Cà phê", "Chụp ảnh"],
      },
      {
        id: 12,
        name: "Lê Thị Hồng",
        age: 24,
        location: "Đà Nẵng",
        bio: "Thích biển và những chuyến đi phượt.",
        photos: [
          "https://images.unsplash.com/photo-1646589391055-06efac9ab4a7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
        interests: ["Du lịch", "Biển", "Phượt"],
      },
      {
        id: 13,
        name: "Phạm Thị Lan",
        age: 21,
        location: "TP.HCM",
        bio: "Sinh viên, thích đọc sách và nghe nhạc indie.",
        photos: [
          "https://plus.unsplash.com/premium_photo-1668790366453-88244085d6d2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
        interests: ["Sách", "Nhạc indie", "Trà sữa"],
      },
      {
        id: 14,
        name: "Trần Thị Thu",
        age: 23,
        location: "Nha Trang",
        bio: "Yêu động vật, đặc biệt là mèo.",
        photos: [
          "https://images.unsplash.com/photo-1595745688820-1a8bca9dd00f?q=80&w=720&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
        interests: ["Mèo", "Động vật", "Phim hoạt hình"],
      },
      {
        id: 15,
        name: "Vũ Thị Ngọc",
        age: 26,
        location: "Cần Thơ",
        bio: "Thích yoga và sống lành mạnh.",
        photos: [
          "https://plus.unsplash.com/premium_photo-1669138512601-e3f00b684edc?q=80&w=685&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
        interests: ["Yoga", "Ăn chay", "Thiền"],
      },
      {
        id: 16,
        name: "Đặng Thị Quỳnh",
        age: 27,
        location: "Hải Phòng",
        bio: "Làm marketing, thích sáng tạo và vẽ tranh.",
        photos: [
          "https://plus.unsplash.com/premium_photo-1668896123844-be3aec7a4776?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
        interests: ["Vẽ", "Marketing", "Sáng tạo"],
      },
      {
        id: 17,
        name: "Bùi Thị Yến",
        age: 25,
        location: "Huế",
        bio: "Thích nấu ăn và làm bánh.",
        photos: [
          "https://plus.unsplash.com/premium_photo-1668896123992-43b8b27cf758?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
        interests: ["Nấu ăn", "Làm bánh", "Ẩm thực"],
      },
      {
        id: 18,
        name: "Hoàng Thị Dung",
        age: 23,
        location: "Quảng Ninh",
        bio: "Yêu thiên nhiên, thích leo núi và picnic.",
        photos: [
          "https://plus.unsplash.com/premium_photo-1668896123983-00aab3eb5b98?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
        interests: ["Leo núi", "Picnic", "Thiên nhiên"],
      },
      {
        id: 19,
        name: "Ngô Thị Hạnh",
        age: 22,
        location: "Bắc Ninh",
        bio: "Thích học ngoại ngữ và giao lưu bạn bè quốc tế.",
        photos: [
          "https://plus.unsplash.com/premium_photo-1668896123988-b1566bb54579?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
        interests: ["Ngoại ngữ", "Du lịch", "Bạn bè"],
      },
      {
        id: 20,
        name: "Lý Thị Kim",
        age: 24,
        location: "Vũng Tàu",
        bio: "Thích chạy bộ buổi sáng và nghe podcast.",
        photos: [
          "https://plus.unsplash.com/premium_photo-1671586882920-8cd59c84cdfe?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
        interests: ["Chạy bộ", "Podcast", "Sức khỏe"],
      },
      {
        id: 1,
        name: "Nguyễn Thị Anh",
        age: 25,
        location: "Hà Nội",
        bio: "Thích du lịch và khám phá ẩm thực mới. Tìm người có cùng sở thích!",
        photos: [
          "https://plus.unsplash.com/premium_photo-1668485966810-cbd0f685f58f?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
        interests: ["Du lịch", "Ẩm thực", "Phim ảnh", "Âm nhạc"],
      },
      {
        id: 2,
        name: "Trần Văn Bình",
        age: 28,
        location: "TP.HCM",
        bio: "Lập trình viên, thích chơi game và xem phim. Tìm người để chia sẻ cuộc sống.",
        photos: [
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face",
        ],
        interests: ["Công nghệ", "Game", "Phim ảnh", "Thể thao"],
      },
      {
        id: 3,
        name: "Lê Thị Cẩm",
        age: 23,
        location: "Đà Nẵng",
        bio: "Sinh viên ngành thiết kế, yêu nghệ thuật và thiên nhiên. Tìm người có tâm hồn nghệ sĩ!",
        photos: [
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop&crop=face",
        ],
        interests: ["Nghệ thuật", "Thiết kế", "Thiên nhiên", "Sách"],
      },
      {
        id: 4,
        name: "Phạm Hoàng Dũng",
        age: 30,
        location: "Hải Phòng",
        bio: "Doanh nhân, thích thể thao và âm nhạc. Tìm người để xây dựng tương lai cùng nhau.",
        photos: [
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop&crop=face",
        ],
        interests: ["Kinh doanh", "Thể thao", "Âm nhạc", "Du lịch"],
      },
      {
        id: 5,
        name: "Vũ Thị Em",
        age: 26,
        location: "Cần Thơ",
        bio: "Giáo viên tiếng Anh, thích đọc sách và nấu ăn. Tìm người chân thành và tử tế.",
        photos: [
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop&crop=face",
        ],
        interests: ["Giáo dục", "Sách", "Nấu ăn", "Ngôn ngữ"],
      },
    ];
  }

  connectedCallback() {
    this._render();
    this._setupEventListeners();
  }

  _render() {
    this.shadowRoot.innerHTML = `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :host {
          display: block;
          width: 100%;
          min-height: 100vh;
          height: 100dvh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          position: relative;
          overflow: hidden;
        }

        .tender-container {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
          position: relative;
        }

        .header {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          padding: calc(20px + env(safe-area-inset-top, 0px)) 100px 20px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 10;
        }

        .logo {
          font-size: 24px;
          font-weight: bold;
          color: white;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }

        .stats {
          display: flex;
          gap: 20px;
          color: white;
          font-size: 14px;
        }

        .card-stack {
          position: relative;
          width: 100%;
          max-width: 350px;
          height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .card {
          position: absolute;
          width: 100%;
          height: 100%;
          background: white;
          border-radius: 20px;
          border: 3px solid transparent; /* Border mặc định trong suốt */
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          overflow: hidden;
          cursor: grab;
          transition: transform 0.3s ease, border 0.2s ease;
          transform-origin: center;
        }

        .card:active {
          cursor: grabbing;
          border: 5px solid #3b82f6; /* Tăng border khi đang drag */
        }

        .card.swiping-left {
          transform: rotate(-15deg) translateX(-100px);
          background: linear-gradient(135deg, #ff6b6b, #ee5a52);
        }

        .card.swiping-right {
          transform: rotate(15deg) translateX(100px);
          background: linear-gradient(135deg, #4ecdc4, #44a08d);
        }

        .card-image {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          position: relative;
        }

        .card-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0,0,0,0.8));
          padding: 20px;
          color: white;
        }

        .card-name {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 5px;
        }

        .card-age {
          font-size: 18px;
          opacity: 0.9;
          margin-bottom: 10px;
        }

        .card-location {
          font-size: 14px;
          opacity: 0.8;
          margin-bottom: 10px;
        }

        .card-bio {
          font-size: 14px;
          line-height: 1.4;
          margin-bottom: 15px;
        }

        .card-interests {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .interest-tag {
          background: rgba(255,255,255,0.2);
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
        }

        .swipe-indicator {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          font-size: 48px;
          font-weight: bold;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 5;
        }

        .swipe-indicator.left {
          left: 20px;
          color: #ff6b6b;
        }

        .swipe-indicator.right {
          right: 20px;
          color: #4ecdc4;
        }

        .swipe-indicator.show {
          opacity: 1;
        }

        .action-buttons {
          position: absolute;
          bottom: calc(40px + env(safe-area-inset-bottom, 0px));
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 20px;
          z-index: 10;
        }

        .action-btn {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: none;
          font-size: 24px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }

        .action-btn:hover {
          transform: scale(1.1);
        }

        .action-btn:active {
          transform: scale(0.95);
        }

        .btn-dislike {
          background: #ff6b6b;
          color: white;
        }

        .btn-like {
          background: #4ecdc4;
          color: white;
        }

        .empty-state {
          text-align: center;
          color: white;
          padding: 40px;
        }

        .empty-state h2 {
          font-size: 24px;
          margin-bottom: 10px;
        }

        .empty-state p {
          font-size: 16px;
          opacity: 0.8;
        }

        .reset-btn {
          background: rgba(255,255,255,0.2);
          color: white;
          border: 2px solid white;
          padding: 12px 24px;
          border-radius: 25px;
          font-size: 16px;
          cursor: pointer;
          margin-top: 20px;
          transition: all 0.3s ease;
        }

        .reset-btn:hover {
          background: white;
          color: #667eea;
        }

        @media (max-width: 480px) {
          .tender-container {
            padding: 10px;
          }
          
          .card-stack {
            max-width: 300px;
            height: 450px;
          }
          
          .action-buttons {
            bottom: 40px;
          }
          
          .action-btn {
            width: 50px;
            height: 50px;
            font-size: 20px;
          }
        }
      </style>
      
      <div class="tender-container">
        <div class="header">
          <div class="logo">🔥 Tender</div>
          <div class="stats">
            <span>❤️ ${this.liked.length}</span>
            <span>👎 ${this.disliked.length}</span>
          </div>
        </div>

        <div class="card-stack">
          <div class="swipe-indicator left">👎</div>
          <div class="swipe-indicator right">❤️</div>
          
          ${
            this.currentIndex < this.players.length
              ? this._renderCard(this.players[this.currentIndex])
              : ""
          }
        </div>

        ${
          this.currentIndex < this.players.length
            ? `
          <div class="action-buttons">
            <button class="action-btn btn-dislike" onclick="this.getRootNode().host._handleDislike()">👎</button>
            <button class="action-btn btn-like" onclick="this.getRootNode().host._handleLike()">❤️</button>
          </div>
        `
            : `
          <div class="empty-state">
            <h2>Hết người rồi! 😅</h2>
            <p>Bạn đã xem hết tất cả người dùng.</p>
            <button class="reset-btn" onclick="this.getRootNode().host._reset()">Bắt đầu lại</button>
          </div>
        `
        }
      </div>
    `;
  }

  _renderCard(player) {
    return `
      <div class="card" data-player-id="${player.id}">
        <div class="card-image" style="background-image: url('${
          player.photos[0]
        }')">
          <div class="card-overlay">
            <div class="card-name">${player.name}</div>
            <div class="card-age">${player.age} tuổi</div>
            <div class="card-location">📍 ${player.location}</div>
            <div class="card-bio">${player.bio}</div>
            <div class="card-interests">
              ${player.interests
                .map(
                  (interest) => `<span class="interest-tag">${interest}</span>`
                )
                .join("")}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  _setupEventListeners() {
    const cardStack = this.shadowRoot.querySelector(".card-stack");

    // Thiết lập sự kiện touch cho mobile
    cardStack.addEventListener("touchstart", this._handleTouchStart.bind(this));
    cardStack.addEventListener("touchmove", this._handleTouchMove.bind(this));
    cardStack.addEventListener("touchend", this._handleTouchEnd.bind(this));

    // Thiết lập sự kiện mouse cho desktop
    cardStack.addEventListener("mousedown", this._handleMouseDown.bind(this));
    cardStack.addEventListener("mousemove", this._handleMouseMove.bind(this));
    cardStack.addEventListener("mouseup", this._handleMouseUp.bind(this));
    cardStack.addEventListener("mouseleave", this._handleMouseLeave.bind(this));
  }

  _handleTouchStart(e) {
    e.preventDefault();
    const touch = e.touches[0];
    this._startDrag(touch.clientX, touch.clientY);
  }

  _handleTouchMove(e) {
    e.preventDefault();
    if (!this.isDragging) return;

    const touch = e.touches[0];
    this._updateDrag(touch.clientX, touch.clientY);
  }

  _handleTouchEnd(e) {
    e.preventDefault();
    this._endDrag();
  }

  _handleMouseDown(e) {
    e.preventDefault();
    this._startDrag(e.clientX, e.clientY);
  }

  _handleMouseMove(e) {
    e.preventDefault();
    if (!this.isDragging) return;

    this._updateDrag(e.clientX, e.clientY);
  }

  _handleMouseUp(e) {
    e.preventDefault();
    this._endDrag();
  }

  _handleMouseLeave(e) {
    e.preventDefault();
    this._endDrag();
  }

  _startDrag(x, y) {
    // Kiểm tra nếu đã hết người để swipe
    if (this.currentIndex >= this.players.length) return;

    // Bắt đầu trạng thái drag
    this.isDragging = true;
    this.startX = x;
    this.startY = y;
    this.currentX = x;
    this.currentY = y;

    // Tắt transition để drag mượt mà
    const card = this.shadowRoot.querySelector(".card");
    if (card) {
      card.style.transition = "none";
    }
  }

  _updateDrag(x, y) {
    if (!this.isDragging) return;

    // Cập nhật vị trí hiện tại và tính offset
    this.currentX = x;
    this.currentY = y;
    this.offsetX = this.currentX - this.startX;
    this.offsetY = this.currentY - this.startY;

    const card = this.shadowRoot.querySelector(".card");
    if (!card) return;

    // Tính toán rotation và translation cho hiệu ứng
    const rotation = this.offsetX * 0.1;
    const translateX = this.offsetX;

    // Áp dụng transform cho card
    card.style.transform = `rotate(${rotation}deg) translateX(${translateX}px)`;

    // Cập nhật hiển thị swipe indicators
    const leftIndicator = this.shadowRoot.querySelector(
      ".swipe-indicator.left"
    );
    const rightIndicator = this.shadowRoot.querySelector(
      ".swipe-indicator.right"
    );

    // Kiểm tra hướng swipe và hiển thị indicator tương ứng
    if (this.offsetX < -this.swipeThreshold) {
      // Swipe trái - hiển thị indicator dislike
      leftIndicator.classList.add("show");
      rightIndicator.classList.remove("show");
      card.classList.add("swiping-left");
      card.classList.remove("swiping-right");
    } else if (this.offsetX > this.swipeThreshold) {
      // Swipe phải - hiển thị indicator like
      rightIndicator.classList.add("show");
      leftIndicator.classList.remove("show");
      card.classList.add("swiping-right");
      card.classList.remove("swiping-left");
    } else {
      // Chưa đạt threshold - ẩn tất cả indicators
      leftIndicator.classList.remove("show");
      rightIndicator.classList.remove("show");
      card.classList.remove("swiping-left", "swiping-right");
    }
  }

  _endDrag() {
    if (!this.isDragging) return;

    // Kết thúc trạng thái drag
    this.isDragging = false;

    const card = this.shadowRoot.querySelector(".card");
    if (!card) return;

    // Ẩn tất cả swipe indicators
    this.shadowRoot
      .querySelectorAll(".swipe-indicator")
      .forEach((indicator) => {
        indicator.classList.remove("show");
      });

    // Kiểm tra xem có đạt threshold để swipe không
    if (Math.abs(this.offsetX) >= this.swipeThreshold) {
      // Đã đạt threshold - thực hiện swipe
      if (this.offsetX > 0) {
        this._handleLike(); // Swipe phải - like
      } else {
        this._handleDislike(); // Swipe trái - dislike
      }
    } else {
      // Chưa đạt threshold - trả card về vị trí ban đầu
      card.style.transition = "transform 0.5s ease";
      card.style.transform = "rotate(0deg) translateX(0px)";
      card.classList.remove("swiping-left", "swiping-right");
    }
  }

  _handleLike() {
    // Kiểm tra nếu đã hết người
    if (this.currentIndex >= this.players.length) return;

    // Thêm người hiện tại vào danh sách liked
    const currentPlayer = this.players[this.currentIndex];
    this.liked.push(currentPlayer);

    // Thực hiện animation swipe phải
    this._swipeCard("right");
  }

  _handleDislike() {
    // Kiểm tra nếu đã hết người
    if (this.currentIndex >= this.players.length) return;

    // Thêm người hiện tại vào danh sách disliked
    const currentPlayer = this.players[this.currentIndex];
    this.disliked.push(currentPlayer);

    // Thực hiện animation swipe trái
    this._swipeCard("left");
  }

  _swipeCard(direction) {
    const card = this.shadowRoot.querySelector(".card");
    if (!card) return;

    // Tính toán hướng và khoảng cách di chuyển
    const directionMultiplier = direction === "right" ? 1 : -1;
    const translateX = directionMultiplier * window.innerWidth * 1.5; // Di chuyển ra khỏi màn hình
    const rotation = directionMultiplier * 30; // Xoay card

    // Thực hiện animation swipe
    card.style.transition = "transform 2s ease";
    card.style.transform = `rotate(${rotation}deg) translateX(${translateX}px)`;

    // Cập nhật thống kê like/dislike
    this._updateStats();

    // Xóa card và chuyển sang người tiếp theo sau khi animation hoàn thành
    setTimeout(() => {
      this.currentIndex++;
      this._render();
      this._setupEventListeners();
    }, 500);
  }

  _updateStats() {
    const stats = this.shadowRoot.querySelector(".stats");
    if (stats) {
      stats.innerHTML = `
        <span>❤️ ${this.liked.length}</span>
        <span>👎 ${this.disliked.length}</span>
      `;
    }
  }

  _closeModal() {
    // Tìm modal cha và đóng nó
    const modal = this.closest("app-modal");
    if (modal) {
      modal.close();
    }
  }

  _reset() {
    // Reset lại tất cả dữ liệu về trạng thái ban đầu
    this.liked = [];
    this.disliked = [];
    this.currentIndex = 0;
    this._render();
    this._setupEventListeners();
  }
}

customElements.define("app-tender", AppTender);
