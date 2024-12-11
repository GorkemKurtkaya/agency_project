/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});


document.getElementById("portfolioForm").addEventListener("submit", async function (e) {
    e.preventDefault(); // Sayfanın yenilenmesini engelle

    const formData = new FormData(this);

    try {
        const response = await fetch("http://localhost:3000/portfolio", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            alert("Portfolio Başarıyla Eklendi");
            // Modal'ı kapat
            const modal = bootstrap.Modal.getInstance(document.getElementById("addPortfolioModal"));
            modal.hide();
            // Sayfayı yenileyebilir veya yeni eklenen veriyi gösterebilirsiniz
            location.reload();
        } else {
            const error = await response.json();
            alert("Error: " + error.message);
        }
    } catch (error) {
        alert("An error occurred: " + error.message);
    }
});

async function deletePortfolio(id) {
    if (confirm("Are you sure you want to delete this portfolio?")) {
        try {
            const response = await fetch(`http://localhost:3000/portfolio/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                alert("Portfolio Başarıyla Silindi!");
                location.reload();
            } else {
                alert("Failed to delete portfolio.");
            }
        } catch (error) {
            alert("An error occurred: " + error.message);
        }
    }
}

function openUpdateModal(portfolio) {
    document.getElementById("updatePortfolioId").value = portfolio._id;
    document.getElementById("updateTitle").value = portfolio.title;
    document.getElementById("updateProjectName").value = portfolio.projectName;
    document.getElementById("updateProjectAlt").value = portfolio.projectAlt;
    document.getElementById("updateProjectDescription").value = portfolio.projectDescription;
    document.getElementById("updateClient").value = portfolio.client;
    document.getElementById("updateCategory").value = portfolio.category;

    // Modal'ı aç
    const updateModal = new bootstrap.Modal(document.getElementById("updatePortfolioModal"));
    updateModal.show();
}

document.getElementById("updatePortfolioForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const id = document.getElementById("updatePortfolioId").value;
    const formData = new FormData(this);

    try {
        const response = await fetch(`http://localhost:3000/portfolio/${id}`, {
            method: "PUT",
            body: formData,
        });

        if (response.ok) {
            alert("Portfolio Başarıyla Güncellendi!");
            const modal = bootstrap.Modal.getInstance(document.getElementById("updatePortfolioModal"));
            modal.hide();
            location.reload();
        } else {
            alert("Hata Oluştu");
        }
    } catch (error) {
        alert("An error occurred: " + error.message);
    }
});


