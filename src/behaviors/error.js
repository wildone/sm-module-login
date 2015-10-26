const easings = simpla.constants.easings,
      WOBBLE = '12px',
      CODES = {
        401: 'Wrong username or pasword',
        500: 'Something has gone wrong on our servers'
      };

export default {
  observers: [
    '_triggerError(error)'
  ],

  _triggerError(error) {
    if (error) {
      this._triggerErrorOpen();
    } else {
      this._triggerErrorClose();
    }
  },

  get _errorAnimations() {
    return {
      modal: {
        target: this.$.modal.getModal(),
        frames: [
          { transform: 'translateX(0)' },
          { transform: 'translateX(-' + WOBBLE + ')' },
          { transform: 'translateX(0)' },
          { transform: 'translateX(' + WOBBLE + ')' },
          { transform: 'translateX(0)' }
        ],
        opts: {
          easing: 'linear',
          duration: 145,
          iterations: 2
        }
      },
      error: {
        target: this.$.error,
        frames: [
          { opacity: 0, height: 0 },
          { opacity: 1, height: '55px' }
        ],
        opts: {
          easing: easings.easeOutCubic,
          fill: 'both',
          duration: 140,
          delay: 80
        }
      }
    }
  },

  _triggerErrorOpen() {
    let modal = this._errorAnimations.modal,
        error = this._errorAnimations.error,
        modalAnimation;

    modalAnimation = modal.target.animate(modal.frames, modal.opts);

    modalAnimation.onfinish = () => {
      this.errorMessage = CODES[401];
      this.toggleAttribute('visible', true, this.$.error)
      error.target.animate(error.frames, error.opts);
    };

  },

  _triggerErrorClose() {
    let { target:errorOutput, frames, opts } = this._errorAnimations.error,
        animation;

    animation = errorOutput.animate(frames.reverse(), opts);
    animation.onfinish = () => {
      this.toggleAttribute('visible', true, errorOutput)
      this.errorMessage = '';
    }
  }

}
