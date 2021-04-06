window.onload = function() {
    
}

function update_qty(elem_id, change_value) {
    let curr_val = parseInt(document.getElementById(elem_id).textContent);
    let new_val = curr_val + change_value;
    new_val = new_val > 0 ? new_val : 1;
    document.getElementById(elem_id).textContent = new_val;
}