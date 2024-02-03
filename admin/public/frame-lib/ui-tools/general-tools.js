$(document).ready(function() {

//  Tabs

    $('#code-uplers-frame ul.tabs li').click(function(){
        var tab_id = $(this).attr('data-tab');
        var parent_id = $(this).attr('parent-id');
        var parent_id_ = (parent_id.length > 0)?'#'+parent_id:'';
        // console.log(tab_id, parent_id_);
        $('#code-uplers-frame '+parent_id_+' ul.tabs li').removeClass('current');
        $('#code-uplers-frame '+parent_id_+' .tab-content').removeClass('current');

        $(this).addClass('current');
        $('#code-uplers-frame '+parent_id_+' .tab-content#'+tab_id).addClass('current');
    })






//  Modals

    
    var modalparent = document.getElementsByClassName("modal_multi");
    var modal_btn_multi = document.getElementsByClassName("myBtn_multi");
    var span_close_multi = document.getElementsByClassName("close_multi");
    function setDataIndex() {
        for (i = 0; i < modal_btn_multi.length; i++)
        {
            modal_btn_multi[i].setAttribute('data-index', i);
            modalparent[i].setAttribute('data-index', i);
            span_close_multi[i].setAttribute('data-index', i);
        }
    }
    for (i = 0; i < modal_btn_multi.length; i++)
    {
        modal_btn_multi[i].onclick = function() {
            var ElementIndex = this.getAttribute('data-index');
            modalparent[ElementIndex].style.display = "block";
        };
        span_close_multi[i].onclick = function() {
            var ElementIndex = this.getAttribute('data-index');
            modalparent[ElementIndex].style.display = "none";
        };
    }
    window.onload = function() {
        setDataIndex();
    };
    window.onclick = function(event) {
        if (event.target === modalparent[event.target.getAttribute('data-index')]) {
            modalparent[event.target.getAttribute('data-index')].style.display = "none";
        }
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
    var modal = document.getElementById('myModal');
    var btn = document.getElementById("myBtn");
    var span = modal.getElementsByClassName("close")[0]; // Modified by dsones uk
    btn.onclick = function() {
        modal.style.display = "block";
    }
    span.onclick = function() {
        modal.style.display = "none";
    }







})