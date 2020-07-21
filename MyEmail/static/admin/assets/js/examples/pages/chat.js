$(function () {
    $(document).on('click', '.chat-block .chat-sidebar .chat-sidebar-content .chat-lists a', function () {
        $('.chat-block .chat-content').removeClass('no-chat-selected');
        $('.chat-block .chat-sidebar .chat-sidebar-content .chat-lists a').removeClass('active');
        $(this).addClass('active');
        var chat_messages = $('.chat-block .chat-content .messages');
        chat_messages.getNiceScroll().resize();
        chat_messages.getNiceScroll(0).doScrollTop(chat_messages.get(0).scrollHeight, -1);
        return false;
    });
});
