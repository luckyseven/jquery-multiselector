(function( $ ){

    var id = 0;

    var getSelected = function(parent)
    {
        return $(parent).first().children('.' + $.fn.multiSelector.defaults.selectedElementClass);
    };

    var methods = {
        bind : function(options) {
            var mths = this;
            options = $.extend($.fn.multiSelector.defaults, options);

            this.each(function() {

                var parent = this;
                var listId = 'l' + ++id;
                $(this).data('ms-id', listId);

                if (options.disableSelection)
                    $(this).on('selectstart', function() {return false;});

                $(this).on('click', options.selector, function(e) {

                    options.onSelectionStart(getSelected(parent), parent, this);

                    var lastSelected = $(parent).children('.' + options.lastElementClass);

                    if (lastSelected.length === 0)
                        lastSelected = $(parent).children(options.selector);

                    if (lastSelected.length > 0 && e.shiftKey && !options.disableShift)
                    {
                        var list        = $(parent).children(options.selector);
                        var lastIndex   = list.index(lastSelected.first());
                        var curIndex    = list.index(this);

                        $(parent).children('.ms-shifted').removeClass('ms-shifted').removeClass('ms-selected');

                        list.slice(Math.min(lastIndex, curIndex), Math.max(lastIndex, curIndex) + 1).addClass(options.selectedElementClass).addClass('ms-shifted');
                        options.onSelectionEnd(getSelected(parent), parent, this);
                        return;
                    }

                    $(parent).children(options.selector).removeClass('ms-shifted');

                    lastSelected.removeClass(options.lastElementClass);

                    if ((!e.ctrlKey && !e.metaKey) || options.disableCtrl)
                    {
                        $(parent).children(options.selector).not(this).removeClass(options.selectedElementClass);

                    }

                    $(this).toggleClass(options.selectedElementClass);
                    $(this).toggleClass(options.lastElementClass, $(this).hasClass(options.selectedElementClass));

                    if ($(parent).children('.' + options.lastElementClass).length === 0)
                    {
                        var nextSelected = $(this).next();
                        var nextFound = false;
                        while(nextSelected.length > 0)
                        {
                            if ($(nextSelected[0]).hasClass(options.selectedElementClass))
                            {
                                nextFound = true;
                                $(nextSelected[0]).addClass(options.lastElementClass);
                                break;
                            }
                            nextSelected = $(nextSelected[0]).next();
                        }
                        if ($(parent).children('.' + options.lastElementClass).length === 0)
                        {
                            var prevSelected = $(this).prev();
                            var prevFound = false;
                            while(prevSelected.length > 0)
                            {
                                if ($(prevSelected[0]).hasClass(options.selectedElementClass))
                                {
                                    prevFound = true;
                                    $(prevSelected[0]).addClass(options.lastElementClass);
                                    break;
                                }
                                prevSelected = $(prevSelected[0]).next();
                            }
                        }
                    }
                    options.onSelectionEnd($(parent).children('.' + options.selectedElementClass), parent, this);

                });
            })
        },
        get: function()
        {
            if (this.length > 1)
            {
                var elements = {};
                this.each(function()
                {
                    elements[$(this).data('ms-id')] = getSelected(this);
                });
                return elements;
            }
            return getSelected(this);
        },
        select: function()
        {
            this.each(function()
            {
                $(this).children($.fn.multiSelector.defaults.selector).addClass($.fn.multiSelector.defaults.selectedElementClass);
            });
        },
        deselect: function()
        {
            this.each(function()
            {
                $(this).children($.fn.multiSelector.defaults.selector).removeClass($.fn.multiSelector.defaults.selectedElementClass).removeClass($.fn.multiSelector.defaults.lastElementClass);
            });
        },
        unbind: function()
        {
            this.each(function() {
                $(this).unbind('click selectstart');
            });
        }
    };

    $.fn.multiSelector = function(arg) {
        if ( methods[arg] ) {
            return methods[ arg ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof arg === 'object' || ! arg ) {
            return methods.bind.apply( this, arguments );
        } else {
            $.error( 'Method ' +  arg + ' does not exist on jQuery.multiSelector' );
        }
    };

    $.fn.multiSelector.defaults = {
        selectedElementClass:   'ms-selected',
        lastElementClass:       'ms-last',
        selector:               '*',
        disableSelection:       true,
        disableShift:           false,
        disableCtrl:            false,
        onSelectionStart:       function() {},
        onSelectionEnd:         function() {}
    };

})( jQuery );