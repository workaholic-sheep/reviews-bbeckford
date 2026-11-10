
// ========================================
// B. BECKFORD LAW FIRM - REVIEW WEBSITE
// Main JavaScript
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    // 1. Get HTML Elements

    const reviewForm = document.getElementById("reviewForm");
    const clientName = document.getElementById("clientName");
    const feedback = document.getElementById("feedback");
    const ratingInput = document.getElementById("rating");
    const ratingText = document.getElementById("ratingText");
    const stars = document.querySelectorAll(".star");
    const characterCount = document.getElementById("characterCount");
    const submitButton = document.getElementById("submitButton");
    const successMessage = document.getElementById("successMessage");
    const errorMessage = document.getElementById("errorMessage");
    const errorText = document.getElementById("errorText");
    const currentYear = document.getElementById("currentYear");

    // 2. Set Current Year

    currentYear.textContent = new Date().getFullYear();

    // 3. Star Rating

    let selectedRating = 0;

    const ratingLabels = {
        1: "Poor",
        2: "Fair",
        3: "Good",
        4: "Very Good",
        5: "Excellent"
    };

    function updateStars(rating) {
        stars.forEach(function (star) {
            const starRating = Number(star.dataset.rating);

            star.classList.toggle("active", starRating <= rating);
            star.setAttribute(
                "aria-pressed",
                starRating === rating ? "true" : "false"
            );
        });

        ratingText.textContent = rating
            ? ratingLabels[rating]
            : "Select your rating";
    }

    stars.forEach(function (star) {
        star.addEventListener("click", function () {
            selectedRating = Number(this.dataset.rating);
            ratingInput.value = selectedRating;

            updateStars(selectedRating);
            validateForm();
        });
    });

    // 4. Feedback Character Counter

    function updateCharacterCount() {
        characterCount.textContent = feedback.value.length;
    }

    feedback.addEventListener("input", function () {
        updateCharacterCount();
        validateForm();
    });

    // 5. Marketing Consent

    function getMarketingConsent() {
        const selectedConsent = document.querySelector(
            'input[name="marketingConsent"]:checked'
        );

        return selectedConsent ? selectedConsent.value : null;
    }

    document.querySelectorAll(
        'input[name="marketingConsent"]'
    ).forEach(function (option) {
        option.addEventListener("change", validateForm);
    });

    // 6. Form Validation

    function validateForm() {
        const nameValid = clientName.value.trim().length > 0;
        const ratingValid = selectedRating >= 1 && selectedRating <= 5;
        const feedbackValid =
            feedback.value.trim().length >= 10 &&
            feedback.value.length <= 1000;

        const consentValid = ["yes", "no"].includes(
            getMarketingConsent()
        );

        submitButton.disabled = !(
            nameValid &&
            ratingValid &&
            feedbackValid &&
            consentValid
        );
    }

    clientName.addEventListener("input", validateForm);

    // 7. Form Submission

    reviewForm.addEventListener("submit", function (event) {
        event.preventDefault();

        errorMessage.hidden = true;
        successMessage.hidden = true;

        // Validate again before proceeding

        validateForm();

        if (submitButton.disabled) {
            errorText.textContent =
                "Please complete all required fields.";
            errorMessage.hidden = false;
            return;
        }

        const reviewData = {
            clientName: clientName.value.trim(),
            rating: selectedRating,
            feedback: feedback.value.trim(),
            marketingConsent: getMarketingConsent()
        };

        // Frontend prototype only:
        // No database connection has been configured yet.

        console.log("Review form data:", reviewData);

        successMessage.querySelector("p").textContent =
            "This is a demonstration only. Your review has not been saved or sent. Database integration is not configured yet.";

        successMessage.hidden = false;

        reviewForm.reset();

        selectedRating = 0;
        ratingInput.value = "";

        updateStars(0);
        updateCharacterCount();
        validateForm();

        successMessage.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    });

    // 8. Initial Setup

    updateStars(0);
    updateCharacterCount();
    validateForm();

});
