// -- FUNCTIONS -- //
function openMenu() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("open");
}

// Every time a category is clicked, it's children are revealed/hidden
document.querySelectorAll(".category_parent").forEach(parent => {
    parent.addEventListener("click", () => {
        /* Disable old active parent */
        try {
            const old_active = document.getElementById("parent_active");
            if (old_active != parent ) {
                old_active.removeAttribute("id");
                old_active.nextElementSibling.classList.toggle("active");
            }
        } catch {

        };

        // Enable/Disable children items
        const siblings = parent.nextElementSibling;
        siblings.classList.toggle("active");
        if (siblings.classList.contains("active")) {
            parent.id = "parent_active";
        }
        else {
            parent.removeAttribute("id");
        }
    });
});

// Every time an item is clicked, its set to active
document.querySelectorAll(".category_item").forEach(item => {
    item.addEventListener("click", () => {
        // Disable old active item
        try {
            const old_active = document.getElementById("item_active");
            old_active.removeAttribute("id");
        } catch {

        };

        // Set to active
        item.id = "item_active";
    });
});