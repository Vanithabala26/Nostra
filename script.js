

document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       MOBILE NAVIGATION
    ========================= */

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function () {
            const isOpen = navLinks.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.textContent = isOpen ? "✕" : "☰";
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );
        });

        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navLinks.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.textContent = "☰";
                menuToggle.setAttribute("aria-label", "Open navigation");
            });
        });
    }


    /* =========================
       COLLECTION SEARCH & FILTERS
    ========================= */

    const productGrid = document.getElementById("product-grid");

    if (productGrid) {
        const productCards = Array.from(
            productGrid.querySelectorAll(".product-card")
        );

        const searchInput = document.getElementById("product-search");
        const clearSearchButton = document.getElementById("clear-search");
        const clearFiltersButton = document.getElementById("clear-filters");
        const resultCount = document.getElementById("result-count");
        const emptyState = document.getElementById("empty-state");

        const filterCheckboxes = Array.from(
            document.querySelectorAll(
                '.filters input[type="checkbox"]'
            )
        );

        function updateProducts() {
            const searchTerm = searchInput
                ? searchInput.value.trim().toLowerCase()
                : "";

            // Group selected checkbox values by filter category.
            const selectedFilters = {};

            filterCheckboxes.forEach(function (checkbox) {
                if (checkbox.checked) {
                    const groupName = checkbox.name;

                    if (!selectedFilters[groupName]) {
                        selectedFilters[groupName] = [];
                    }

                    selectedFilters[groupName].push(
                        checkbox.value.toLowerCase()
                    );
                }
            });

            let visibleCount = 0;

            productCards.forEach(function (card) {
                const productName = (
                    card.dataset.name || ""
                ).toLowerCase();

                const productCategory = (
                    card.dataset.category || ""
                ).toLowerCase();

                const productColor = (
                    card.dataset.color || ""
                ).toLowerCase();

                const productArrival = (
                    card.dataset.arrival || ""
                ).toLowerCase();

                const searchableText = [
                    productName,
                    productCategory,
                    productColor,
                    productArrival,
                    card.textContent.toLowerCase()
                ].join(" ");

                // Match the search term.
                const matchesSearch =
                    searchableText.includes(searchTerm);

                // A product matches when it meets at least one
                // selected option within each filter group.
                const matchesCategory =
                    !selectedFilters.category ||
                    selectedFilters.category.includes(productCategory);

                const matchesColor =
                    !selectedFilters.color ||
                    selectedFilters.color.includes(productColor);

                const matchesArrival =
                    !selectedFilters.arrival ||
                    selectedFilters.arrival.includes(productArrival);

                const isVisible =
                    matchesSearch &&
                    matchesCategory &&
                    matchesColor &&
                    matchesArrival;

                card.hidden = !isVisible;

                if (isVisible) {
                    visibleCount++;
                }
            });

            // Update the number of matching products.
            if (resultCount) {
                resultCount.textContent =
                    "Showing " + visibleCount + " of " +
                    productCards.length + " products";
            }

            // Show a message if nothing matches.
            if (emptyState) {
                emptyState.hidden = visibleCount !== 0;
            }
        }

        // Search as the user types.
        if (searchInput) {
            searchInput.addEventListener("input", updateProducts);
        }

        // Update products when a filter changes.
        filterCheckboxes.forEach(function (checkbox) {
            checkbox.addEventListener("change", updateProducts);
        });

        // Clear the search field.
        if (clearSearchButton) {
            clearSearchButton.addEventListener("click", function () {
                if (searchInput) {
                    searchInput.value = "";
                    searchInput.focus();
                }

                updateProducts();
            });
        }

        // Clear every filter.
        if (clearFiltersButton) {
            clearFiltersButton.addEventListener("click", function () {
                filterCheckboxes.forEach(function (checkbox) {
                    checkbox.checked = false;
                });

                updateProducts();
            });
        }

        // Set the initial product count.
        updateProducts();
    }


    /* =========================
       NEWSLETTER FORM
    ========================= */

    const newsletterForms = document.querySelectorAll(
        "[data-newsletter]"
    );

    newsletterForms.forEach(function (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const emailInput = form.querySelector(
                'input[type="email"]'
            );

            const message = form.querySelector(".form-message");

            if (!emailInput || !message) {
                return;
            }

            if (!emailInput.checkValidity()) {
                emailInput.reportValidity();
                return;
            }

            message.textContent =
                "Thank you for your interest in Nostra!";

            form.reset();
        });
    });


    /* =========================
       CONTACT FORM
    ========================= */

    const contactForm = document.getElementById("contact-form");
    const contactFeedback = document.getElementById("contact-message");

    if (contactForm && contactFeedback) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            contactFeedback.textContent =
                "Thank you for your message! This demo form does not send messages yet.";

            contactForm.reset();
        });
    }

});
```