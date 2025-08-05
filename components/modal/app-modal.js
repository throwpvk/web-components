class AppModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.isOpen = false;
    this.isFullScreen = false;
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
          max-width: 100vw;
          max-height: 100vh;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          transform: scale(0.5);
          opacity: 0;
          transition: all 0.3s ease;
          overflow: hidden;
          position: relative;
        }

        .modal-overlay.show .modal-container {
          transform: scale(1);
          opacity: 1;
        }

        .modal-container.fullscreen {
          width: calc(100vh * 9 / 16);
          height: 100vh;
          max-width: 90vw;
          min-width: 400px;
          border-radius: 12px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .modal-header {
          padding: 20px 24px 0;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .modal-container.fullscreen .modal-header {
          display: none;
        }

        .modal-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1f2937;
          margin: 0;
          line-height: 1.4;
        }

        .close-btn {
          background: rgba(0,0,0,0.3);
          border: none;
          border-radius: 50%;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 4px;
          transition: all 0.2s ease;
          line-height: 1;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          top: 20px;
          right: 20px;
          z-index: 1000;
        }

        .close-btn:hover {
          background: #f3f4f6;
          color: #374151;
        }

        .close-btn:active {
          transform: scale(0.95);
        }

        .modal-content {
          padding: 0;
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

        .btn-secondary {
          background: #f3f4f6;
          color: #374151;
        }

        .btn-secondary:hover {
          background: #e5e7eb;
        }

        @media (max-width: 640px) {
          .modal-container {
            min-width: 90vw;
            margin: 20px;
          }
          
          .modal-container.fullscreen {
            width: 100vw;
            height: 100vh;
            min-width: 100vw;
            max-width: 100vw;
            margin: 0;
            border-radius: 0;
            box-shadow: none;
          }
          
          .modal-header {
            padding: 16px 20px 0;
          }
          
          .modal-content {
            padding: 12px 20px 16px;
          }

          .modal-container.fullscreen .modal-content {
            padding: 0;
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
          </div>
          <button class="close-btn" aria-label="Close modal">×</button>
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
    const overlay = this.shadowRoot.querySelector('.modal-overlay');
    const closeBtn = this.shadowRoot.querySelector('.close-btn');

    // Close khi click vào overlay
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        this.close();
      }
    });

    // Close khi click vào button X
    closeBtn.addEventListener('click', () => {
      this.close();
    });
  }

  _handleKeydown(e) {
    if (e.key === 'Escape' && this.isOpen) {
      this.close();
    }
  }

  open() {
    if (this.isOpen) return;

    this.isOpen = true;
    
    // Kiểm tra trạng thái fullscreen
    this.isFullScreen = this.hasAttribute('fullscreen');
    
    // Thêm event listener cho ESC
    document.addEventListener('keydown', this._boundHandleKeydown);
    
    // Hiển thị modal với hiệu ứng
    const overlay = this.shadowRoot.querySelector('.modal-overlay');
    const container = this.shadowRoot.querySelector('.modal-container');
    overlay.classList.add('show');
    
    // Áp dụng trạng thái fullscreen
    if (this.isFullScreen) {
      container.classList.add('fullscreen');
    } else {
      container.classList.remove('fullscreen');
    }
    
    // Set heading
    const title = this.shadowRoot.querySelector('.modal-title');
    title.textContent = this.getAttribute('heading') || 'Modal';
  }

  close() {
    if (!this.isOpen) return;

    this.isOpen = false;
    
    // Xóa event listener cho ESC
    document.removeEventListener('keydown', this._boundHandleKeydown);
    
    // Ẩn modal với hiệu ứng
    const overlay = this.shadowRoot.querySelector('.modal-overlay');
    overlay.classList.remove('show');
  }

  toggleFullScreen() {
    if (!this.isOpen) return;
    
    this.isFullScreen = !this.isFullScreen;
    const container = this.shadowRoot.querySelector('.modal-container');
    
    if (this.isFullScreen) {
      container.classList.add('fullscreen');
      this.setAttribute('fullscreen', '');
    } else {
      container.classList.remove('fullscreen');
      this.removeAttribute('fullscreen');
    }
  }

  setFullScreen(fullscreen) {
    if (!this.isOpen) return;
    
    this.isFullScreen = fullscreen;
    const container = this.shadowRoot.querySelector('.modal-container');
    
    if (this.isFullScreen) {
      container.classList.add('fullscreen');
      this.setAttribute('fullscreen', '');
    } else {
      container.classList.remove('fullscreen');
      this.removeAttribute('fullscreen');
    }
  }

  disconnectedCallback() {
    // Cleanup event listeners
    document.removeEventListener('keydown', this._boundHandleKeydown);
  }
}

customElements.define('app-modal', AppModal);
