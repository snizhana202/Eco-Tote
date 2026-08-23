import iconsUrl from '../img/icons.svg';

export function renderStars() {
  const feedbackItems = document.querySelectorAll('.feedback-person');

  feedbackItems.forEach(item => {
    const rating = Number(item.dataset.rating) || 5;
    const starsContainer = item.querySelector('.stars-img');

    let starsHTML = '<ul class="star-list">';
    for (let i = 1; i <= 5; i++) {
      const iconId = i <= rating ? 'star-fillled' : 'star';
      starsHTML += `
        <li class="stars-icon-place">
          <svg class="stars-icon" width="20" height="21">
            <use href="${iconsUrl}#${iconId}"></use>
          </svg>
        </li>
      `;
    }
    starsHTML += '</ul>';

    starsContainer.innerHTML = starsHTML;
  });
}
