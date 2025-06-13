// noinspection JSUnresolvedReference

(function ($) {
    const activeToasts = []; // Array to track active toasts

    $.bsToast = function (options) {
        const settings = $.extend(
            true,
            {
                type: "info",
                title: null,
                message: "Always be informed",
                start: 0,
                delay: 5000,
                autoHide: true,
                animation: true,
                placement: "mc",
                staticBackdrop: false,
                onShow() {},
                onShown() {},
                onHide() {},
                onHidden() {},
            },
            options || {},
        );

        const toastContainerId =
            "toast_container_583555b1-3319-4b81-a812-2819f8dfae9c_" +
            settings.placement;

        function getIconByType(type) {
            switch (type) {
                case "info":
                    return "bi bi-info-circle";
                case "warning":
                    return "bi bi-exclamation-triangle";
                case "success":
                    return "bi bi-check2";
                case "danger":
                    return "bi bi-x";
                default:
                    return "bi bi-chevron-right";
            }
        }

        function getBackdrop() {
            const selector = $(".toast-backdrop");
            return selector.length ? selector : null;
        }

        function getContainer() {
            if (settings.staticBackdrop) {
                if (null === getBackdrop()) {
                    $("<div>", {
                        class:
                            "position-absolute h-100 w-100 start-0 top-0 bottom-0 end-0 toast-backdrop",
                        css: {
                            display: "none",
                            backgroundColor: "rgba(0,0,0,.5)",
                            zIndex: 1055,
                        },
                    }).appendTo("body");
                }
            }

            let container = $("#" + toastContainerId);
            if (container.length) return container;
            let placementClass = "";
            switch (settings.placement) {
                case "ts":
                    placementClass = "top-0 start-0";
                    break;
                case "tc":
                    placementClass = "top-0 start-50 translate-middle-x";
                    break;
                case "te":
                    placementClass = "top-0 end-0";
                    break;
                case "ms":
                    placementClass = "top-50 start-0 translate-middle-y";
                    break;
                case "mc":
                    placementClass = "top-50 start-50 translate-middle";
                    break;
                case "me":
                    placementClass = "top-50 end-0 translate-middle-y";
                    break;
                case "bs":
                    placementClass = "bottom-0 start-0";
                    break;
                case "bc":
                    placementClass = "bottom-0 start-50 translate-middle-x";
                    break;
                case "be":
                    placementClass = "bottom-0 end-0";
                    break;
            }
            container = $("<div>", {
                id: toastContainerId,
                class: `toast-container position-fixed ${placementClass} p-3`,
            }).appendTo(getBackdrop() || "body");
            return container;
        }

        function getColorByType(type) {
            switch (type) {
                case "info":
                case "warning":
                case "success":
                case "danger":
                case "light":
                case "dark":
                case "primary":
                case "secondary":
                    return type;
                default:
                    const htmlTheme = $("html").attr("data-bs-theme");
                    return htmlTheme === "dark" ? "light" : "dark";
            }
        }

        function build() {
            let header = "";
            const config = {
                show: settings.start,
                hide: settings.delay,
            };
            const fade = settings.animation ? "fade" : "";
            const toast = $("<div>", {
                class: `toast ${fade} text-bg-${getColorByType(
                    settings.type,
                )} border-0`,
                role: "alert",
                "aria-live": "assertive",
                "aria-atomic": "true",
                "data-bs-delay": config.hide,
                "data-bs-autohide": settings.autoHide,
            }).appendTo(getContainer());

            let closeButtonSet = false;

            if (settings.title !== null) {
                const icon = getIconByType(settings.type);
                header = `
                <div class="toast-header">
                    <i class="${icon} rounded me-2"></i>
                    <strong class="me-auto">${settings.title}</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>`;
                $(header).appendTo(toast);
                closeButtonSet = true;
            }

            let toastBody = `
            <div class="toast-body">
               ${settings.message}
            </div>`;

            if(!closeButtonSet) {
                toastBody = `<div class="d-flex align-items-start flex-nowrap">${toastBody}<button type="button" class="btn-close ms-auto me-2 my-2" data-bs-dismiss="toast" aria-label="Close"></button></div>`;
            }


            $(toastBody).appendTo(toast);

            // Add toast to the activeToasts array
            activeToasts.push(toast);

            toast.isExists = function () {
                return activeToasts.includes(toast);
            };

            // Attach events
            toast
                .on("hide.bs.toast", () => {
                    if (settings.onHide) settings.onHide();
                })
                .on("hidden.bs.toast", () => {
                    // Remove toast from the activeToasts array
                    const index = activeToasts.indexOf(toast);
                    if (index !== -1) {
                        activeToasts.splice(index, 1);
                    }
                    if (settings.onHidden) settings.onHidden();
                })
                .on("show.bs.toast", settings.onShow)
                .on("shown.bs.toast", settings.onShown);

            // Show the toast
            setTimeout(() => {
                toast.toast("show");
            }, settings.start);

            return toast; // Return the toast reference
        }

        return build(); // Return the built toast
    };

    // Public method to get all active toasts
    $.bsToast.getToasts = function () {
        return activeToasts;
    };

    // Public method to close all active toasts
    $.bsToast.closeAll = function () {
        // Create a copy of the activeToasts array to iterate safely
        const toastsToClose = [...activeToasts];

        toastsToClose.forEach(function (toast) {
            toast.toast('hide'); // Trigger the hide event on each toast
        });
    };

})(jQuery);
