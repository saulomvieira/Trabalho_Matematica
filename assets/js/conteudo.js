        // Accordion functionality
        document.querySelectorAll('.accordion-trigger').forEach(trigger => {
            trigger.addEventListener('click', function () {
                const content = this.nextElementSibling;
                const isActive = content.classList.contains('active');

                // Close all accordions in the same parent
                const parent = this.closest('.accordion');
                parent.querySelectorAll('.accordion-content').forEach(c => {
                    c.classList.remove('active');
                });
                parent.querySelectorAll('.accordion-trigger').forEach(t => {
                    t.classList.remove('active');
                });

                // Toggle current accordion
                if (!isActive) {
                    content.classList.add('active');
                    this.classList.add('active');
                }
            });
        });