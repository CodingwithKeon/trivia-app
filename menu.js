document.addEventListener("DOMContentLoaded", function () {
    // 1. Create the page transition curtain dynamically
    let overlay = document.getElementById("pageTransitionOverlay");
    if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "pageTransitionOverlay";
        document.body.appendChild(overlay);
    }

    // Trigger initial page reveal
    requestAnimationFrame(function () {
        overlay.classList.add("fade-in");
    });

    // Helper for smooth navigation fade-out
    window.smoothNavigate = function (url) {
        overlay.classList.remove("fade-in");
        overlay.classList.add("fade-out");
        setTimeout(function () {
            window.location.href = url;
        }, 400); // 0.4s delay matches CSS transition
    };

    // Attach click handlers to menu buttons
    const button1 = document.getElementById("button1");
    if (button1) {
        button1.addEventListener("click", function () {
            smoothNavigate("categories.html");
        });
    }

    const button2 = document.getElementById("button2");
    if (button2) {
        button2.addEventListener("click", function () {
            smoothNavigate("leaderboard.html");
        });
    }

    const button3 = document.getElementById("button3");
    if (button3) {
        button3.addEventListener("click", function () {
            showQuitConfirmation();
        });
    }
});

function showQuitConfirmation() {
    const overlay = document.createElement("div");
    overlay.id = "confirmOverlay";
    overlay.style.cssText = "position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.7); z-index: 100; display: flex; justify-content: center; align-items: center;";
    
    const confirmBox = document.createElement("div");
    confirmBox.style.cssText = "background-color: rgba(0, 0, 0, 0.85); border: 2px solid gold; border-radius: 8px; padding: 30px; text-align: center; z-index: 101; width: 90%; max-width: 350px;";
    
    const text = document.createElement("h2");
    text.textContent = "Are you sure you want to quit?";
    text.style.cssText = "color: white; font-family: 'Roboto Slab', serif; font-size: 1.3em; margin-bottom: 25px;";
    
    const yesBtn = document.createElement("button");
    yesBtn.textContent = "YES";
    yesBtn.style.cssText = "background-color: white; color: black; border: 2px solid gold; border-radius: 8px; padding: 10px 25px; font-size: 1.1em; margin-right: 15px; cursor: pointer; font-family: 'Roboto Slab', serif;";
    yesBtn.addEventListener("click", function () {
        if (typeof window.smoothNavigate === "function") {
            window.smoothNavigate("categories.html");
        } else {
            window.location.href = "categories.html";
        }
    });
    
    const noBtn = document.createElement("button");
    noBtn.textContent = "NO";
    noBtn.style.cssText = "background-color: white; color: black; border: 2px solid gold; border-radius: 8px; padding: 10px 25px; font-size: 1.1em; cursor: pointer; font-family: 'Roboto Slab', serif;";
    noBtn.addEventListener("click", function () {
        document.body.removeChild(overlay);
    });
    
    confirmBox.appendChild(text);
    confirmBox.appendChild(yesBtn);
    confirmBox.appendChild(noBtn);
    overlay.appendChild(confirmBox);
    document.body.appendChild(overlay);
}