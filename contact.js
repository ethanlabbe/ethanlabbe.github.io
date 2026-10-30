        async function copyEmailToClipboard(email) {
            if (!email) return false;

            try {
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(email);
                    return true;
                }

                const textArea = document.createElement('textarea');
                textArea.value = email;
                textArea.setAttribute('readonly', '');
                textArea.style.position = 'fixed';
                textArea.style.top = '-9999px';
                document.body.appendChild(textArea);
                textArea.select();
                const copied = document.execCommand('copy');
                document.body.removeChild(textArea);
                return copied;
            } catch (error) {
                console.error('Copy failed:', error);
                return false;
            }
        }

        function bindCopyEmail() {
            const emailButtons = document.querySelectorAll('.copy-email');

            emailButtons.forEach((button) => {
                button.addEventListener('click', async (event) => {
                    event.preventDefault();
                    const email = button.dataset.email || button.textContent.trim();
                    const copied = await copyEmailToClipboard(email);

                    if (copied) {
                        const originalText = button.textContent.trim();
                        button.classList.add('copied');
                        button.textContent = 'Email copied!';
                        setTimeout(() => {
                            button.textContent = originalText;
                            button.classList.remove('copied');
                        }, 1200);
                    } else {
                        button.textContent = 'Try email link';
                        setTimeout(() => { button.textContent = 'Copy email'; }, 2000);
                    }
                });
            });
        }


bindCopyEmail();
