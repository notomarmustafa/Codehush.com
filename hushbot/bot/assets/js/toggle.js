document.addEventListener("DOMContentLoaded", function () {
    var titles = document.querySelectorAll('.title');
    titles.forEach(function (title) {
        title.addEventListener('click', function () {
            var sectionId = this.getAttribute('data-section-id');
            var content = document.getElementById(sectionId);


            if (content.style.display === "block") {
                content.style.display = "none";
            } else {

                var allContents = document.querySelectorAll('.content');
                allContents.forEach(function (item) {
                    item.style.display = "none";
                });


                content.style.display = "block";
                content.style.border = "2px solid #7404d6";
                content.style.borderRadius = "10px";
                content.style.paddingLeft = "10px";
            }
        });
    });
});