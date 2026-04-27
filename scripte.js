let panier = [];

// AJOUT PANIER + FEEDBACK
function ajouterAuPanier(btn) {
    let nom = btn.getAttribute("data-nom");
    let prix = parseInt(btn.getAttribute("data-prix"));

    let existant = panier.find(item => item.nom === nom);

    if (existant) {
        existant.quantite += 1;
    } else {
        panier.push({ nom: nom, prix: prix, quantite: 1 });
    }

    afficherPanier();

    // effet visuel
    let oldText = btn.innerText;
    btn.innerText = "Ajouté ✔";
    btn.style.background = "#2ecc71";
    btn.style.transform = "scale(1.05)";

    setTimeout(() => {
        btn.innerText = oldText;
        btn.style.background = "";
        btn.style.transform = "";
    }, 900);
}

// AFFICHER PANIER
function afficherPanier() {
    let liste = document.getElementById("listePanier");
    let total = 0;
    let totalQuantite = 0;

    liste.innerHTML = "";

    panier.forEach(item => {
        let li = document.createElement("li");

        li.innerHTML = `
            ${item.nom} x${item.quantite} - ${item.prix * item.quantite} FCFA
            <button onclick="supprimerDuPanier('${item.nom}')"
                style="margin-left:10px; background:red; color:white; border:none; border-radius:4px;">
                ❌
            </button>
        `;

        liste.appendChild(li);

        total += item.prix * item.quantite;
        totalQuantite += item.quantite;
    });

    document.getElementById("total").textContent = total + " FCFA";
    document.getElementById("badgePanier").textContent = totalQuantite;
}

// SUPPRIMER
function supprimerDuPanier(nom) {
    panier = panier.filter(item => item.nom !== nom);
    afficherPanier();
}

// WHATSAPP
function commanderWhatsApp() {
    let message = "Bonjour, je souhaite commander :\n";
    let total = 0;

    panier.forEach(item => {
        message += `- ${item.nom} x${item.quantite}\n`;
        total += item.prix * item.quantite;
    });

    message += `Total : ${total} FCFA`;

    let numero = "221772794606";
    let url = "https://wa.me/" + numero + "?text=" + encodeURIComponent(message);

    window.open(url, "_blank");
}

// PANIER
function togglePanier() {
    let overlay = document.getElementById("panierOverlay");
    overlay.style.display = overlay.style.display === "block" ? "none" : "block";
}

// badge caché au départ
window.onload = function () {
    document.getElementById("badgePanier").style.display = "inline-block";
};