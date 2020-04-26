var windowObjectReference = null;
document.getElementsByClassName("chat-overlay-header")[0].onclick = function (e) {
    e.preventDefault();
    if (windowObjectReference == null || windowObjectReference.closed) {
        //*** This is where you change the height of the window that opens. The value of height is the height of the window in pixels. We recommend that you leave this as is. ***/
        var height = 500;
        //*** This is where you change the width of the window that opens. The value of width is the width of the window in pixels. We recommend that you leave this as is. ***/
        var width = 500;
        var l = document.body.clientWidth - (width / 2);
        var t = document.body.scrollHeight - (height / 2);
        //*** This toggles if there is a hyperlink after "Talk to a doctor for guidance" recommendations. This is where you change the URL for 'Please click here' hyperlink to point to your preferred URL by changing bpn_Connect=www.your_URL.com.  You can leave at the defaukt setting of "none" to toggle off the hyperlink. ***/
        windowObjectReference = window.open("https://sharecare.amelia.com/Amelia/ui/screener/?embed=iframe&bpn_Connect=none", "", 'height=' + height + ', width=' + width + ', left=' + l + ', top=' + t);
    } else {
        windowObjectReference.focus();
    }
    return false;
}