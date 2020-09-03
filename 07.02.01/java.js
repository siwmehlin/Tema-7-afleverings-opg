        let menu;
        let filter = "alle";
        document.addEventListener("DOMContentLoaded", hentdata)


        async function hentdata() {
            const JASONData = await fetch("https://spreadsheets.google.com/feeds/list/17Dd7DvkPaFamNUdUKlrFgnH6POvBJXac7qyiS6zNRw0/od6/public/values?alt=json");
            menu = await JASONData.json();
            addEventListenersToButtons();
            visMenu();
        }

        function visMenu() {
            console.log(menu);

            const templatePointer = document.querySelector("template");
            const listPointer = document.querySelector("#list");
            const popop = document.querySelector("#popop");

            listPointer.innerHTML = "";

            menu.feed.entry.forEach(navn => {
                if (filter == "alle" || filter == navn.gsx$kategori.$t) {
                    console.log(navn);

                    const klon = templatePointer.cloneNode(true).content;
                    klon.querySelector(".navn").textContent = navn.gsx$navn.$t;

                    klon.querySelector(".køn").textContent = "Kategori: " + navn.gsx$kategori.$t;
                    klon.querySelector(".pris").textContent = "Pris: " + navn.gsx$pris.$t + " kr";
                    klon.querySelector(".beskrivelse").textContent = "Beskrivelse: " + navn.gsx$kort.$t;
                    klon.querySelector("img").src = "imgs/small/" + navn.gsx$billede.$t + "-sm.jpg";

                    klon.querySelector("article").addEventListener("click", () => visDetaljer(navn))
                    listPointer.appendChild(klon);

                }
            })

        }

        document.querySelector("#luk").addEventListener("click", () => popop.style.display = "none");



        function visDetaljer(navn) {
            console.log(navn);
            popop.style.display = "block";
            popop.querySelector(".navn").textContent = navn.gsx$navn.$t;
            popop.querySelector(".køn").textContent = navn.gsx$kategori.$t;
            popop.querySelector(".beskrivelse").textContent = navn.gsx$lang.$t;
            popop.querySelector(".pris").textContent = navn.gsx$pris.$t + " kr";
            popop.querySelector("img").src = "imgs/large/" + navn.gsx$billede.$t + ".jpg";


        }

        function addEventListenersToButtons() {
            document.querySelectorAll(".filter").forEach((btn) => {
                btn.addEventListener("click", filterBTNs);
            });
        }

        function filterBTNs() {
            filter = this.dataset.kategori;
            document.querySelector("#emne").textContent = this.textContent;
            visMenu();
        }
