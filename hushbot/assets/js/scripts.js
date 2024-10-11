function toggleMenu(menuId) {
  const submenu = document.getElementById(menuId);
  if (submenu.style.display === "block") {
    submenu.style.display = "none"; // Hide submenu if it's already open
  } else {
    submenu.style.display = "block"; // Show submenu
  }
}

window.addEventListener('load', onLoad);

        function onLoad () {
          const copyrightEl = document.getElementById('copyright');

          if (copyrightEl) {
            const currentYear = new Date().getFullYear();
            const copyrightText = `&copy; ${currentYear} Code Hush | All rights reserved `;

            copyrightEl.innerHTML = copyrightText;
          }
        }