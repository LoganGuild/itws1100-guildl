$(function () {
  $.ajax({
    type: "GET",
    url: "lab08json.json",
    dataType: "json",
    success: function (responseData) {
      const cards = responseData.labFiles.map(function (item) {
        const tags = item.technologies
          .map(function (technology) {
            return `<span>${technology}</span>`;
          })
          .join("");

        return `
          <a class="project-card" href="${item.page}">
            <div class="project-meta">
              <span>${item.number}</span>
              <span class="project-arrow" aria-hidden="true">↗</span>
            </div>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <div class="project-tags" aria-label="Technologies used">${tags}</div>
          </a>`;
      });

      $("#projects").html(cards.join(""));
      window.requestAnimationFrame(function () {
        document.querySelectorAll(".project-card").forEach(function (card, index) {
          window.setTimeout(function () {
            card.classList.add("ready");
          }, index * 80);
        });
      });
    },
    error: function () {
      $("#projects").html(
        '<p class="error-message">The project data could not be loaded. Please refresh the page and try again.</p>',
      );
    },
  });
});
