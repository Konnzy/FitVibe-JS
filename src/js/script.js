// Task 3
function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
        const [key, value] = cookie.split("=");
        if (key === name) {
            return decodeURIComponent(value);
        }
    }
    return null;
}

document.addEventListener('DOMContentLoaded', function () {
    const menuBtn = document.getElementById('menu-btn');
    const navMenu = document.getElementById('menu1');

    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', function () {
            navMenu.classList.toggle('show');
        });
    }

    // Task 1
    const block1 = document.getElementById('block1');
    const block6 = document.getElementById('block6');

    let t1 = block1.innerHTML;
    block1.innerHTML = block6.innerHTML;
    block6.innerHTML = t1;

    // Task 2
    const d1 = 5;
    const d2 = 6;

    function DiamondArea(a, b) {
        return (a * b) / 2;
    }

    document.querySelector('#block3').innerHTML += "<h3>Diamond Area is " + DiamondArea(d1, d2) + "</h3>";

    // Task 3
    const form = document.getElementById('triangle-form');

    const triangleCookie = getCookie('triangle');

    if (triangleCookie) {
        form.style.display = 'none';
        const shouldDelete = confirm("Found saved result: \"" + triangleCookie + "\".\nDelete this cookie?");

        if (shouldDelete) {
            document.cookie = "triangle=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
            location.reload();
        } else {
            alert("Result is saved to cookies. For change result, restart the page after deleting cookies.");
        }
    }

    function TriangleRegularity(a, b, c) {
        if (a <= 0 || b <= 0 || c <= 0)
            return false;
        else if (a + b <= c || a + c <= b || b + c <= a)
            return false;

        return true;
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const a = parseFloat(document.getElementById('sideA').value);
        const b = parseFloat(document.getElementById('sideB').value);
        const c = parseFloat(document.getElementById('sideC').value);

        const isPossible = TriangleRegularity(a, b, c);
        const message = isPossible ? 'Triangle is possible' : 'Triangle is impossible';

        alert(message);
        document.cookie = `triangle=${encodeURIComponent(message)};path=/`;
        document.querySelector("#block3").innerHTML += "<h3>" + message + "</h3>";
    });

    // Task 4
    const block2 = document.getElementById('block2');
    const enableItalic = document.getElementById('italic-enable');
    const disableItalic = document.getElementById('italic-disable');

    block2.addEventListener('mouseover', function () {
        if (enableItalic.checked) {
            block2.style.fontStyle = 'italic';
            localStorage.setItem('italic', 'true');
        } else if (disableItalic.checked) {
            block2.style.fontStyle = 'normal';
            localStorage.setItem('italic', 'false');
        }
    });

    const savedItalic = localStorage.getItem('italic');
    if (savedItalic === 'true') {
        block2.style.fontStyle = 'italic';
        enableItalic.checked = true;
    } else if (savedItalic === 'false') {
        block2.style.fontStyle = 'normal';
        disableItalic.checked = true;
    }

    // Task 5
    const block4 = document.getElementById('block4');
    const createListLink = document.getElementById('create-list-link');

    renderHabitsListFromStorage();

    createListLink.addEventListener('click', function (event) {
        event.preventDefault();

        createListLink.style.display = 'none';

        const form = document.createElement('form');
        form.id = 'habits-form'

        const label = document.createElement('label');
        label.textContent = 'Enter list items (one per line):';

        const textarea = document.createElement('textarea');
        textarea.id = 'habits-text';
        textarea.rows = 8;
        textarea.cols = 40;

        const saveButton = document.createElement('button');
        saveButton.id = 'save-button';
        saveButton.textContent = 'Save list';

        form.appendChild(label);
        form.appendChild(document.createElement('br'));
        form.appendChild(textarea);
        form.appendChild(document.createElement('br'));
        form.appendChild(saveButton);

        block4.appendChild(form);

        saveButton.addEventListener('click', function (event) {
            event.preventDefault();

            const rawText = textarea.value;
            const items = rawText.split('\n').map(line => line.trim())
                .filter(line => line.length > 0);

            if (items.length === 0) {
                alert("Please enter at least one item");
                return;
            }
            const ol = document.createElement('ol');

            items.forEach((text, index) => {
                const li = document.createElement('li');
                li.textContent = text;

                if (index % 2 === 0) {
                    li.style.backgroundColor = '#000';
                    li.style.color = '#fff';
                } else {
                    li.style.backgroundColor = '#fff';
                    li.style.color = '#000';
                }

                ol.appendChild(li);
            });

            localStorage.setItem('habits-text', JSON.stringify(items));

            block4.innerHTML = '';
            block4.appendChild(ol);
        });
    });

    function renderHabitsListFromStorage() {
        const saved = localStorage.getItem('habits-text');
        if (!saved) {
            return;
        }
        const items = JSON.parse(saved);
        const ol = document.createElement('ol');

        items.forEach((text, index) => {
            const li = document.createElement('li');
            li.textContent = text;
            if (index % 2 === 0) {
                li.style.backgroundColor = '#000';
                li.style.color = '#fff';
            } else {
                li.style.backgroundColor = '#fff';
                li.style.color = '#000';
            }

            ol.appendChild(li);
        });

        block4.innerHTML = '';
        block4.appendChild(ol);
    }
});