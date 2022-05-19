* !jQuery UI - v1.12.1 - 2018 - 12 - 09
  * http://jqueryui.com
* Includes: widget.js, position.js, data.js, disable - selection.js, focusable.js, form - reset - mixin.js, jquery - 1 - 7.js, keycode.js, labels.js, scroll - parent.js, tabbable.js, unique - id.js, widgets / draggable.js, widgets / droppable.js, widgets / resizable.js, widgets / selectable.js, widgets / sortable.js, widgets / accordion.js, widgets / autocomplete.js, widgets / button.js, widgets / checkboxradio.js, widgets / controlgroup.js, widgets / datepicker.js, widgets / dialog.js, widgets / menu.js, widgets / mouse.js, widgets / progressbar.js, widgets / selectmenu.js, widgets / slider.js, widgets / spinner.js, widgets / tabs.js, widgets / tooltip.js, effect.js, effects / effect - blind.js, effects / effect - bounce.js, effects / effect - clip.js, effects / effect - drop.js, effects / effect - explode.js, effects / effect - fade.js, effects / effect - fold.js, effects / effect - highlight.js, effects / effect - puff.js, effects / effect - pulsate.js, effects / effect - scale.js, effects / effect - shake.js, effects / effect - size.js, effects / effect - slide.js, effects / effect - transfer.js
  * Copyright jQuery Foundation and other contributors; Licensed MIT * /

    (function (factory) {
      if (typeof define === "function" && define.amd) {

        // AMD. Register as an anonymous module.
        define(["jquery"], factory);
      } else {

        // Browser globals
        factory(jQuery);
      }
    }(function ($) {

      $.ui = $.ui || {};

      var version = $.ui.version = "1.12.1";


      /*!
       * jQuery UI Widget 1.12.1
       * http://jqueryui.com
       *
       * Copyright jQuery Foundation and other contributors
       * Released under the MIT license.
       * http://jquery.org/license
       */

      //>>label: Widget
      //>>group: Core
      //>>description: Provides a factory for creating stateful widgets with a common API.
      //>>docs: http://api.jqueryui.com/jQuery.widget/
      //>>demos: http://jqueryui.com/widget/



      var widgetUuid = 0;
      var widgetSlice = Array.prototype.slice;

      $.cleanData = (function (orig) {
        return function (elems) {
          var events, elem, i;
          for (i = 0; (elem = elems[i]) != null; i++) {
            try {

              // Only trigger remove when necessary to save time
              events = $._data(elem, "events");
              if (events && events.remove) {
                $(elem).triggerHandler("remove");
              }

              // Http://bugs.jquery.com/ticket/8235
            } catch (e) { }
          }
          orig(elems);
        };
      })($.cleanData);

      $.widget = function (name, base, prototype) {
        var existingConstructor, constructor, basePrototype;

        // ProxiedPrototype allows the provided prototype to remain unmodified
        // so that it can be used as a mixin for multiple widgets (#8876)
        var proxiedPrototype = {};

        var namespace = name.split(".")[0];
        name = name.split(".")[1];
        var fullName = namespace + "-" + name;

        if (!prototype) {
          prototype = base;
          base = $.Widget;
        }

        if ($.isArray(prototype)) {
          prototype = $.extend.apply(null, [{}].concat(prototype));
        }

        // Create selector for plugin
        $.expr[":"][fullName.toLowerCase()] = function (elem) {
          return !!$.data(elem, fullName);
        };

        $[namespace] = $[namespace] || {};
        existingConstructor = $[namespace][name];
        constructor = $[namespace][name] = function (options, element) {

          // Allow instantiation without "new" keyword
          if (!this._createWidget) {
            return new constructor(options, element);
          }

          // Allow instantiation without initializing for simple inheritance
          // must use "new" keyword (the code above always passes args)
          if (arguments.length) {
            this._createWidget(options, element);
          }
        };

        // Extend with the existing constructor to carry over any static properties
        $.extend(constructor, existingConstructor, {
          version: prototype.version,

          // Copy the object used to create the prototype in case we need to
          // redefine the widget later
          _proto: $.extend({}, prototype),

          // Track widgets that inherit from this widget in case this widget is
          // redefined after a widget inherits from it
          _childConstructors: []
        });

        basePrototype = new base();

        // We need to make the options hash a property directly on the new instance
        // otherwise we'll modify the options hash on the prototype that we're
        // inheriting from
        basePrototype.options = $.widget.extend({}, basePrototype.options);
        $.each(prototype, function (prop, value) {
          if (!$.isFunction(value)) {
            proxiedPrototype[prop] = value;
            return;
          }
          proxiedPrototype[prop] = (function () {
            function _super() {
              return base.prototype[prop].apply(this, arguments);
            }

            function _superApply(args) {
              return base.prototype[prop].apply(this, args);
            }

            return function () {
              var __super = this._super;
              var __superApply = this._superApply;
              var returnValue;

              this._super = _super;
              this._superApply = _superApply;

              returnValue = value.apply(this, arguments);

              this._super = __super;
              this._superApply = __superApply;

              return returnValue;
            };
          })();
        });
        constructor.prototype = $.widget.extend(basePrototype, {

          // TODO: remove support for widgetEventPrefix
          // always use the name + a colon as the prefix, e.g., draggable:start
          // don't prefix for widgets that aren't DOM-based
          widgetEventPrefix: existingConstructor ? (basePrototype.widgetEventPrefix || name) : name
        }, proxiedPrototype, {
          constructor: constructor,
          namespace: namespace,
          widgetName: name,
          widgetFullName: fullName
        });

        // If this widget is being redefined then we need to find all widgets that
        // are inheriting from it and redefine all of them so that they inherit from
        // the new version of this widget. We're essentially trying to replace one
        // level in the prototype chain.
        if (existingConstructor) {
          $.each(existingConstructor._childConstructors, function (i, child) {
            var childPrototype = child.prototype;

            // Redefine the child widget using the same prototype that was
            // originally used, but inherit from the new version of the base
            $.widget(childPrototype.namespace + "." + childPrototype.widgetName, constructor,
              child._proto);
          });

          * !jQuery UI - v1.12.1 - 2018 - 12 - 09
            * http://jqueryui.com
* Includes: widget.js, position.js, data.js, disable - selection.js, focusable.js, form - reset - mixin.js, jquery - 1 - 7.js, keycode.js, labels.js, scroll - parent.js, tabbable.js, unique - id.js, widgets / draggable.js, widgets / droppable.js, widgets / resizable.js, widgets / selectable.js, widgets / sortable.js, widgets / accordion.js, widgets / autocomplete.js, widgets / button.js, widgets / checkboxradio.js, widgets / controlgroup.js, widgets / datepicker.js, widgets / dialog.js, widgets / menu.js, widgets / mouse.js, widgets / progressbar.js, widgets / selectmenu.js, widgets / slider.js, widgets / spinner.js, widgets / tabs.js, widgets / tooltip.js, effect.js, effects / effect - blind.js, effects / effect - bounce.js, effects / effect - clip.js, effects / effect - drop.js, effects / effect - explode.js, effects / effect - fade.js, effects / effect - fold.js, effects / effect - highlight.js, effects / effect - puff.js, effects / effect - pulsate.js, effects / effect - scale.js, effects / effect - shake.js, effects / effect - size.js, effects / effect - slide.js, effects / effect - transfer.js
            * Copyright jQuery Foundation and other contributors; Licensed MIT * /

              (function (factory) {
                if (typeof define === "function" && define.amd) {

                  // AMD. Register as an anonymous module.
                  define(["jquery"], factory);
                } else {

                  // Browser globals
                  factory(jQuery);
                }
              }(function ($) {

                $.ui = $.ui || {};

                var version = $.ui.version = "1.12.1";


                /*!
                 * jQuery UI Widget 1.12.1
                 * http://jqueryui.com
                 *
                 * Copyright jQuery Foundation and other contributors
                 * Released under the MIT license.
                 * http://jquery.org/license
                 */

                //>>label: Widget
                //>>group: Core
                //>>description: Provides a factory for creating stateful widgets with a common API.
                //>>docs: http://api.jqueryui.com/jQuery.widget/
                //>>demos: http://jqueryui.com/widget/



                var widgetUuid = 0;
                var widgetSlice = Array.prototype.slice;

                $.cleanData = (function (orig) {
                  return function (elems) {
                    var events, elem, i;
                    for (i = 0; (elem = elems[i]) != null; i++) {
                      try {

                        // Only trigger remove when necessary to save time
                        events = $._data(elem, "events");
                        if (events && events.remove) {
                          $(elem).triggerHandler("remove");
                        }

                        // Http://bugs.jquery.com/ticket/8235
                      } catch (e) { }
                    }
                    orig(elems);
                  };
                })($.cleanData);

                $.widget = function (name, base, prototype) {
                  var existingConstructor, constructor, basePrototype;

                  // ProxiedPrototype allows the provided prototype to remain unmodified
                  // so that it can be used as a mixin for multiple widgets (#8876)
                  var proxiedPrototype = {};

                  var namespace = name.split(".")[0];
                  name = name.split(".")[1];
                  var fullName = namespace + "-" + name;

                  if (!prototype) {
                    prototype = base;
                    base = $.Widget;
                  }

                  if ($.isArray(prototype)) {
                    prototype = $.extend.apply(null, [{}].concat(prototype));
                  }

                  // Create selector for plugin
                  $.expr[":"][fullName.toLowerCase()] = function (elem) {
                    return !!$.data(elem, fullName);
                  };

                  $[namespace] = $[namespace] || {};
                  existingConstructor = $[namespace][name];
                  constructor = $[namespace][name] = function (options, element) {

                    // Allow instantiation without "new" keyword
                    if (!this._createWidget) {
                      return new constructor(options, element);
                    }

                    // Allow instantiation without initializing for simple inheritance
                    // must use "new" keyword (the code above always passes args)
                    if (arguments.length) {
                      this._createWidget(options, element);
                    }
                  };

                  // Extend with the existing constructor to carry over any static properties
                  $.extend(constructor, existingConstructor, {
                    version: prototype.version,

                    // Copy the object used to create the prototype in case we need to
                    // redefine the widget later
                    _proto: $.extend({}, prototype),

                    // Track widgets that inherit from this widget in case this widget is
                    // redefined after a widget inherits from it
                    _childConstructors: []
                  });

                  basePrototype = new base();

                  // We need to make the options hash a property directly on the new instance
                  // otherwise we'll modify the options hash on the prototype that we're
                  // inheriting from
                  basePrototype.options = $.widget.extend({}, basePrototype.options);
                  $.each(prototype, function (prop, value) {
                    if (!$.isFunction(value)) {
                      proxiedPrototype[prop] = value;
                      return;
                    }
                    proxiedPrototype[prop] = (function () {
                      function _super() {
                        return base.prototype[prop].apply(this, arguments);
                      }

                      function _superApply(args) {
                        return base.prototype[prop].apply(this, args);
                      }

                      return function () {
                        var __super = this._super;
                        var __superApply = this._superApply;
                        var returnValue;

                        this._super = _super;
                        this._superApply = _superApply;

                        returnValue = value.apply(this, arguments);

                        this._super = __super;
                        this._superApply = __superApply;

                        return returnValue;
                      };
                    })();
                  });
                  constructor.prototype = $.widget.extend(basePrototype, {

                    // TODO: remove support for widgetEventPrefix
                    // always use the name + a colon as the prefix, e.g., draggable:start
                    // don't prefix for widgets that aren't DOM-based
                    widgetEventPrefix: existingConstructor ? (basePrototype.widgetEventPrefix || name) : name
                  }, proxiedPrototype, {
                    constructor: constructor,
                    namespace: namespace,
                    widgetName: name,
                    widgetFullName: fullName
                  });

                  // If this widget is being redefined then we need to find all widgets that
                  // are inheriting from it and redefine all of them so that they inherit from
                  // the new version of this widget. We're essentially trying to replace one
                  // level in the prototype chain.
                  if (existingConstructor) {
                    $.each(existingConstructor._childConstructors, function (i, child) {
                      var childPrototype = child.prototype;

                      // Redefine the child widget using the same prototype that was
                      // originally used, but inherit from the new version of the base
                      $.widget(childPrototype.namespace + "." + childPrototype.widgetName, constructor,
                        child._proto);
                    });

