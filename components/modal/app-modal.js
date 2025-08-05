class AppModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.isOpen = false;
    this._boundHandleKeydown = this._handleKeydown.bind(this);
  }

  connectedCallback() {
    this._render();
  }

  _render() {
    this.shadowRoot.innerHTML = `
      <style>
        * {
          padding: 0;
          margin: 0;
          box-sizing: border-box;
        }

        .modal-overlay {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.6);
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          z-index: 1000;
        }

        .modal-overlay.show {
          opacity: 1;
          visibility: visible;
        }

        .modal-container {
          min-width: 400px;
          max-width: 90vw;
          max-height: 90vh;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          transform: scale(0.5);
          opacity: 0;
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .modal-overlay.show .modal-container {
          transform: scale(1);
          opacity: 1;
        }

        .modal-header {
          padding: 20px 24px 0;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .modal-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1f2937;
          margin: 0;
          line-height: 1.4;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 1.5rem;
          color: #6b7280;
          cursor: pointer;
          padding: 4px;
          border-radius: 6px;
          transition: all 0.2s ease;
          line-height: 1;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .close-btn:hover {
          background: #f3f4f6;
          color: #374151;
        }

        .close-btn:active {
          transform: scale(0.95);
        }

        .modal-content {
          padding: 26px 24px 30px;
          color: #4b5563;
          line-height: 1.6;
          max-width: 600px;
          overflow-y: auto;
        }

        .modal-footer {
          padding: 0 24px 20px;
          display: flex;
          justify-content: flex-end;
          gap: 12px;
        }

        .btn {
          padding: 8px 16px;
          border: none;
          border-radius: 6px;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-primary {
          background: #3b82f6;
          color: white;
        }

        .btn-primary:hover {
          background: #2563eb;
        }

        @media (max-width: 640px) {
          .modal-container {
            min-width: 90vw;
            margin: 20px;
          }
          
          .modal-header {
            padding: 16px 20px 0;
          }
          
          .modal-content {
            padding: 12px 20px 16px;
          }
          
          .modal-footer {
            padding: 0 20px 16px;
          }
        }
      </style>
      
      <div class="modal-overlay">
        <div class="modal-container">
          <div class="modal-header">
            <h2 class="modal-title"></h2>
            <button class="close-btn" aria-label="Close modal">×</button>
          </div>
          <div class="modal-content">
            <slot></slot>
          </div>
          <div class="modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    `;

    this._setupEventListeners();
  }

  _setupEventListeners() {
    const overlay = this.shadowRoot.querySelector(".modal-overlay");
    const closeBtn = this.shadowRoot.querySelector(".close-btn");

    // Close khi click vào overlay
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        this.close();
      }
    });

    // Close khi click vào button X
    closeBtn.addEventListener("click", () => {
      this.close();
    });
  }

  _handleKeydown(e) {
    if (e.key === "Escape" && this.isOpen) {
      this.close();
    }
  }

  open() {
    if (this.isOpen) return;

    this.isOpen = true;

    // Thêm event listener cho ESC
    document.addEventListener("keydown", this._boundHandleKeydown);

    // Hiển thị modal với hiệu ứng
    const overlay = this.shadowRoot.querySelector(".modal-overlay");
    overlay.classList.add("show");

    // Set heading
    const title = this.shadowRoot.querySelector(".modal-title");
    title.textContent = this.getAttribute("heading") || "Modal";
  }

  close() {
    if (!this.isOpen) return;

    this.isOpen = false;

    // Xóa event listener cho ESC
    document.removeEventListener("keydown", this._boundHandleKeydown);

    // Ẩn modal với hiệu ứng
    const overlay = this.shadowRoot.querySelector(".modal-overlay");
    overlay.classList.remove("show");
  }

  disconnectedCallback() {
    // Xóa event listeners cho ESC
    document.removeEventListener("keydown", this._boundHandleKeydown);
  }
}

customElements.define("app-modal", AppModal);
