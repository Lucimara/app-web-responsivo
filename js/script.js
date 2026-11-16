fetch('componentes/footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer-container').innerHTML = data;
    });

fetch("componentes/header.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("header-container").innerHTML = data;
        inicializarMenu();
    });


function carregarTemas() {

    const container =
        document.getElementById("temas-container");

    if (!container) {
        return;
    }

    fetch("componentes/temas.html")
        .then(response => response.text())
        .then(data => {
            container.innerHTML = data;
            inicializarTemas();
        });

}

function inicializarTemas() {

    const botoesTema =
        document.querySelectorAll(".btn-tema");

    const temaSalvo =
        localStorage.getItem("tema");

    if (temaSalvo) {
        document.body.classList.add(temaSalvo);
    }

    botoesTema.forEach(botao => {

        botao.addEventListener("click", () => {

            document.body.classList.remove(
                "tema-praia",
                "tema-azul",
                "tema-verde",
                "tema-escuro",
                "tema-vscode"
            );

            const tema =
                botao.dataset.tema;

            if (
                tema &&
                tema !== "padrao"
            ) {

                document.body.classList.add(tema);

            }

            localStorage.setItem(
                "tema",
                tema
            );

        });

    });

}

function inicializarMenu() {

    const btnMenu =
        document.getElementById("toggle-menu");

    const menu =
        document.getElementById("menu");

    if (!btnMenu || !menu) {
        return;
    }

    btnMenu.addEventListener("click", () => {

        menu.classList.toggle("menu-aberto");

        if (menu.classList.contains("menu-aberto")) {
            btnMenu.textContent = "✖";
        } else {
            btnMenu.textContent = "☰";
        }

    });

}

function carregarSidebar() {

    const container =
        document.getElementById("sidebar-container");

    if (!container) {
        return;
    }

    fetch("componentes/sidebar.html")
        .then(response => response.text())
        .then(data => {
            container.innerHTML = data;
            carregarTemas();
        });
}

function carregarBotaoTopo() {

    const container =
        document.getElementById("btn-topo-container");

    if (!container) {
        return;
    }

    fetch("componentes/btn-topo.html")
        .then(response => response.text())
        .then(data => {

            container.innerHTML = data;

            inicializarBotaoTopo();

        });

}

function inicializarBotaoTopo() {

    const btnTopo =
        document.getElementById("btn-topo");

    if (!btnTopo) {
        return;
    }

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {

            btnTopo.style.display = "block";

        } else {

            btnTopo.style.display = "none";

        }

    });

    btnTopo.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}

function inicializarFormularioContato() {

    const formulario =
        document.getElementById("formulario");

    const status =
        document.getElementById("mensagem-status");

    if (!formulario || !status) {
        return;
    }

    formulario.addEventListener("submit", (event) => {

        event.preventDefault();

        const nome =
            document.getElementById("nome");

        const email =
            document.getElementById("email");

        const titulo =
            document.getElementById("titulo");

        const mensagem =
            document.getElementById("mensagem");

        status.textContent = "";
        status.className = "";

        // Remove erros antigos
        document
            .querySelectorAll(".campo-obrigatorio")
            .forEach(item =>
                item.classList.remove("visivel")
            );

        document
            .querySelectorAll(".input-erro")
            .forEach(item =>
                item.classList.remove("input-erro")
            );

        let formularioValido = true;

        if (nome.value.trim() === "") {

            document
                .getElementById("erro-nome")
                .classList.add("visivel");

            nome.classList.add("input-erro");

            formularioValido = false;
        }

        if (email.value.trim() === "") {

            document
                .getElementById("erro-email")
                .classList.add("visivel");

            email.classList.add("input-erro");

            formularioValido = false;
        }

        if (titulo.value.trim() === "") {

            document
                .getElementById("erro-titulo")
                .classList.add("visivel");

            titulo.classList.add("input-erro");

            formularioValido = false;
        }

        if (mensagem.value.trim() === "") {

            document
                .getElementById("erro-mensagem")
                .classList.add("visivel");

            mensagem.classList.add("input-erro");

            formularioValido = false;
        }

        if (!formularioValido) {

            status.textContent =
                "Preencha todos os campos obrigatórios.";

            status.className =
                "erro";

            return;
        }

        const regexEmail =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!regexEmail.test(email.value.trim())) {

            email.classList.add("input-erro");

            status.textContent =
                "Digite um e-mail válido.";

            status.className =
                "erro";

            return;
        }

        status.textContent =
            "Mensagem enviada com sucesso!";

        status.className =
            "sucesso";

        formulario.reset();

        document
            .querySelectorAll(".campo-obrigatorio")
            .forEach(item =>
                item.classList.remove("visivel")
            );

        document
            .querySelectorAll(".input-erro")
            .forEach(item =>
                item.classList.remove("input-erro")
            );

    });

}

document.addEventListener(
    "DOMContentLoaded",
    () => {
        carregarTemas();
        carregarSidebar();
        carregarBotaoTopo();
        inicializarFormularioContato();
    }
);