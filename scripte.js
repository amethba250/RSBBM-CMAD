let panier = [];

/* =========================
   AJOUT PANIER
========================= */
function ajouterAuPanier(btn) {
    let nom = btn.dataset.nom;
    let prix = Number(btn.dataset.prix);

    let item = panier.find(p => p.nom === nom);

    if (item) {
        item.quantite++;
    } else {
        panier.push({ nom, prix, quantite: 1 });
    }

    afficherPanier();

    btn.innerText = "Ajouté ✔";
    btn.disabled = true;

    setTimeout(() => {
        btn.innerText = "Commander";
        btn.disabled = false;
    }, 800);

    document.getElementById("btnPanier").classList.add("bounce");
    setTimeout(() => {
        document.getElementById("btnPanier").classList.remove("bounce");
    }, 400);
}

/* =========================
   AFFICHER PANIER
========================= */
function afficherPanier() {
    let liste = document.getElementById("listePanier");
    let total = 0;
    let totalQte = 0;

    liste.innerHTML = "";

    if (panier.length === 0) {
        liste.innerHTML = "<li>Panier vide 🛒</li>";
    }

    panier.forEach((p, i) => {
        total += p.prix * p.quantite;
        totalQte += p.quantite;

        let li = document.createElement("li");

        li.innerHTML = `
            <div class="panier-item">
                <div>
                    <strong>${p.nom}</strong><br>
                    ${p.quantite} x ${p.prix} FCFA
                </div>
                <button onclick="supprimer(${i})">✕</button>
            </div>
        `;

        liste.appendChild(li);
    });

    document.getElementById("total").textContent = total + " FCFA";

    let badge = document.getElementById("badgePanier");
    badge.textContent = totalQte;
    badge.style.display = totalQte === 0 ? "none" : "inline-block";
}

/* =========================
   SUPPRIMER
========================= */
function supprimer(index) {
    panier.splice(index, 1);
    afficherPanier();
}

/* =========================
   WHATSAPP
========================= */
function commanderWhatsApp() {
    if (panier.length === 0) {
        alert("Panier vide");
        return;
    }

    let msg = "Commande:%0A";
    let total = 0;

    panier.forEach(p => {
        msg += `- ${p.nom} x${p.quantite}%0A`;
        total += p.prix * p.quantite;
    });

    msg += `Total: ${total} FCFA`;

    window.open(
        "https://wa.me/221772794606?text=" + msg,
        "_blank"
    );
}

/* =========================
   TOGGLE PANIER
========================= */
function togglePanier() {
    document.getElementById("panierOverlay").classList.toggle("show");
}

/* =========================
   CLOSE CLICK OUTSIDE
========================= */
document.addEventListener("click", (e) => {
    let overlay = document.getElementById("panierOverlay");
    let btn = document.getElementById("btnPanier");

    if (!overlay.contains(e.target) && !btn.contains(e.target)) {
        overlay.classList.remove("show");
    }
});

/* =========================
   ANIMATION SCROLL
========================= */
document.addEventListener("DOMContentLoaded", () => {
    let cards = document.querySelectorAll(".menu-card");

    let observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add("visible");
            }
        });
    }, { threshold: 0.2 });

    cards.forEach(c => observer.observe(c));
});