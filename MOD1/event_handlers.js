 // Retrieve HTML elements for the interaction

var slider = document.getElementById("slide-explode");
const button_movement = document.getElementById("movement");
const button_frustum = document.getElementById("frustum");
const button_shadows = document.getElementById("shadows");

// Variables linked to button on/off functionality
var toggle_movement_on_off = false, toggle_explotion_on_off = false, toggle_frustum_on_off, toggle_shadow_on_off = true;
// Variables introduced for menaging mechanics status
var transl = 0.0; // explotion
var movement = 0.0; // movement on Y axis

slider.oninput = function() {
    // For every slider value changes we update the translation (explotion distance)
    transl = slider.value / 100.0; // slider has integer value to get a smoother user usage
};

button_movement.onclick = function() {
    toggle_movement_on_off = !toggle_movement_on_off;
}

button_frustum.onclick = function() {
    toggle_frustum_on_off = !toggle_frustum_on_off;
}

button_shadows.onclick = function() {
    toggle_shadow_on_off = !toggle_shadow_on_off;
}

window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }
    switch (event.key) {
        case "e": // e -> explode
            toggle_explotion_on_off = !toggle_explotion_on_off;
            break;
        case "m": // m -> movement
            toggle_movement_on_off = !toggle_movement_on_off;
            break;
        case "f": // f -> frustum
            toggle_frustum_on_off = !toggle_frustum_on_off;
            break;
        case "s": // s -> shadow
            toggle_shadow_on_off = !toggle_shadow_on_off;
            break;
        default:
            return; // Quit when this doesn't handle the key event.
    }
    event.preventDefault(); // Cancel the default action to avoid it being handled twice
}, true);


function define_gui() {
    var gui = new dat.GUI();
    
    gui.add(settings,"D").min(5).max(15).step(0.5);
    gui.add(settings,"posX").min(0).max(10).step(0.5);
    gui.add(settings,"posY").min(0).max(10).step(0.5);
    gui.add(settings,"posZ").min(0).max(10).step(0.5);
    gui.add(settings,"targetX").min(0).max(5).step(0.5);
    gui.add(settings,"targetY").min(-1).max(5).step(0.5);
    gui.add(settings,"targetZ").min(0).max(5).step(0.5);
    gui.add(settings,"projWidth").min(0).max(5).step(0.5);
    gui.add(settings,"projHeight").min(0).max(5).step(0.5);
    gui.add(settings,"bias").min(-0.010).max(0.010).step(0.001);
    gui.add(settings,"fieldOfView").min(60).max(120).step(5);
    gui.add(settings,"dx").min(0.001).max(0.030).step(0.001);
    gui.add(settings,"de").min(0.01).max(0.05).step(0.001);
    gui.add(settings, "show_fps");
    gui.close();
}


