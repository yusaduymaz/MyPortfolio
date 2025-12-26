// Basit dummy veriler
const dummyProjects = [
    {
        id: 1,
        title: "Portfolio v3",
        category: "Frontend",
        status: "published",
        date: "2025-12-21"
    },
    {
        id: 2,
        title: "Admin Panel UI",
        category: "Dashboard",
        status: "draft",
        date: "2025-12-18"
    },
    {
        id: 3,
        title: "Landing Page SaaS",
        category: "UI/UX",
        status: "published",
        date: "2025-12-10"
    }
];

let editingProjectId = null;

document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".nav-link");
    const pages = document.querySelectorAll(".page");
    const pageTitle = document.getElementById("pageTitle");

    const sidebar = document.querySelector(".admin-sidebar");
    const sidebarToggle = document.getElementById("sidebarToggle");

    const modalBackdrop = document.getElementById("modalBackdrop");
    const modalProject = document.getElementById("modalProject");
    const modalCloseButtons = document.querySelectorAll("[data-modal-close]");

    const btnAddProject = document.getElementById("btnAddProject");
    const projectsTableBody = document.getElementById("projectsTableBody");
    const searchProjects = document.getElementById("searchProjects");
    const filterProjectStatus = document.getElementById("filterProjectStatus");
    const projectForm = document.getElementById("projectForm");

    // ------ SIDEBAR TOGGLE (MOBILE) ------
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener("click", () => {
            sidebar.classList.toggle("open");
        });
    }

    // ------ NAVIGASYON / SAYFA GEÇİŞLERİ ------
    navLinks.forEach((btn) => {
        btn.addEventListener("click", () => {
            const target = btn.dataset.page;
            if (!target) return;

            // active class
            navLinks.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            pages.forEach((p) => {
                p.classList.remove("active");
                if (p.id === `page-${target}`) {
                    p.classList.add("active");
                }
            });

            pageTitle.textContent = btn.textContent.trim();

            // mobilde sidebar'ı kapat
            if (window.innerWidth <= 768 && sidebar) {
                sidebar.classList.remove("open");
            }
        });
    });

    // Header card butonlarıyla sayfa açma
    document.querySelectorAll("[data-page-open]").forEach((button) => {
        button.addEventListener("click", () => {
            const target = button.getAttribute("data-page-open");
            const navBtn = document.querySelector(`.nav-link[data-page="${target}"]`);
            if (navBtn) navBtn.click();
        });
    });

    // ------ MODAL FONKSİYONLARI ------
    function openModal(modal) {
        if (!modal) return;
        modal.classList.add("active");
        modalBackdrop.classList.add("active");
    }

    function closeModal(modal) {
        if (!modal) return;
        modal.classList.remove("active");
        modalBackdrop.classList.remove("active");
        editingProjectId = null;
        projectForm.reset();
    }

    modalCloseButtons.forEach((btn) => {
        btn.addEventListener("click", () => closeModal(modalProject));
    });

    modalBackdrop.addEventListener("click", () => {
        closeModal(modalProject);
    });

    // ESC ile modal kapat
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modalProject.classList.contains("active")) {
            closeModal(modalProject);
        }
    });

    // ------ PROJE TABLOSU RENDER ------
    function renderProjects() {
        if (!projectsTableBody) return;

        const searchTerm = (searchProjects?.value || "").toLowerCase();
        const statusFilter = filterProjectStatus?.value || "all";

        projectsTableBody.innerHTML = "";

        const filtered = dummyProjects.filter((p) => {
            const matchesSearch =
                p.title.toLowerCase().includes(searchTerm) ||
                p.category.toLowerCase().includes(searchTerm);

            const matchesStatus =
                statusFilter === "all" ? true : p.status === statusFilter;

            return matchesSearch && matchesStatus;
        });

        if (!filtered.length) {
            projectsTableBody.innerHTML =
                '<tr><td colspan="5">Hiç proje bulunamadı.</td></tr>';
            return;
        }

        filtered.forEach((project) => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${project.title}</td>
                <td>${project.category}</td>
                <td>
                    <span class="badge ${
                        project.status === "published"
                            ? "badge-success"
                            : "badge-warning"
                    }">
                        ${project.status === "published" ? "Yayında" : "Taslak"}
                    </span>
                </td>
                <td>${project.date || "-"}</td>
                <td>
                    <button class="btn btn-sm btn-outline btn-edit" data-id="${project.id}">
                        Düzenle
                    </button>
                    <button class="btn btn-sm btn-outline btn-delete" data-id="${project.id}">
                        Sil
                    </button>
                </td>
            `;

            projectsTableBody.appendChild(tr);
        });

        // Edit / Delete event binding
        projectsTableBody.querySelectorAll(".btn-edit").forEach((btn) => {
            btn.addEventListener("click", () => {
                const id = Number(btn.getAttribute("data-id"));
                editProject(id);
            });
        });

        projectsTableBody.querySelectorAll(".btn-delete").forEach((btn) => {
            btn.addEventListener("click", () => {
                const id = Number(btn.getAttribute("data-id"));
                deleteProject(id);
            });
        });
    }

    // ------ PROJE EKLE/DÜZENLE ------
    if (btnAddProject) {
        btnAddProject.addEventListener("click", () => {
            editingProjectId = null;
            document.getElementById("modalProjectTitle").textContent = "Yeni Proje";
            projectForm.reset();
            openModal(modalProject);
        });
    }

    function editProject(id) {
        const project = dummyProjects.find((p) => p.id === id);
        if (!project) return;

        editingProjectId = id;
        document.getElementById("modalProjectTitle").textContent = "Projeyi Düzenle";

        document.getElementById("projectId").value = project.id;
        document.getElementById("projectTitle").value = project.title;
        document.getElementById("projectCategory").value = project.category;
        document.getElementById("projectStatus").value = project.status;
        document.getElementById("projectDate").value = project.date;
        document.getElementById("projectDescription").value =
            project.description || "";

        openModal(modalProject);
    }

    function deleteProject(id) {
        const index = dummyProjects.findIndex((p) => p.id === id);
        if (index === -1) return;

        if (confirm("Bu projeyi silmek istediğine emin misin?")) {
            dummyProjects.splice(index, 1);
            renderProjects();
        }
    }

    projectForm?.addEventListener("submit", (e) => {
        e.preventDefault();

        const title = document.getElementById("projectTitle").value.trim();
        const category = document.getElementById("projectCategory").value.trim();
        const status = document.getElementById("projectStatus").value;
        const date = document.getElementById("projectDate").value;
        const description = document
            .getElementById("projectDescription")
            .value.trim();

        if (!title || !category) return;

        if (editingProjectId) {
            const project = dummyProjects.find((p) => p.id === editingProjectId);
            if (!project) return;

            project.title = title;
            project.category = category;
            project.status = status;
            project.date = date;
            project.description = description;
        } else {
            dummyProjects.push({
                id: Date.now(),
                title,
                category,
                status,
                date,
                description
            });
        }

        renderProjects();
        closeModal(modalProject);
    });

    searchProjects?.addEventListener("input", renderProjects);
    filterProjectStatus?.addEventListener("change", renderProjects);

    // Initial render
    renderProjects();
});