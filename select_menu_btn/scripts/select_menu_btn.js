var selectMenuBtn = (function() {
  var base = {
    btnHtml: "something",
    makeItemHtml: function() {
      return "<li class='yc-select-menu-item'>" +
               "<label for='select" + this.counter + "' class='yc-select-item-text'>" +
                 "<input type='radio' class='yc-select-radio' id='select" +
                   this.counter + "' value='" + this.counter + "'>" +
                 this.counter++ +
               "</label>" +
             "</li>";
    },
    counter: 0,
    button: null,
    menu: null,
    radioArr: null,
    displayState: false,
    init: function(parent, data) {
      this.parent = parent || document.body;
      this.data = data;
      this.create();
      this.addEvent();
    },
    create: function() {
      if (Object.prototype.toString.call(this.data) !== "[object Array]") {
        this.data = [this.data];
      }
      var len = this.data.length;

      var btn = this.button = document.createElement("button");
      btn.className = "yc-select-menu-btn";
      btn.type = "button";
      btn.innerHTML = this.btnHtml;

      var menu = this.menu = document.createElement("ul");
      menu.className = "yc-select-menu-list";
      var html = "";
      for (var i = 0; i < len; i++) {
        html += this.makeItemHtml();
      }
      menu.innerHTML = html;
      this.radioArr = menu.querySelectorAll("input");

      this.parent.appendChild(btn);
      this.parent.appendChild(menu);
    },
    addEvent: function() {
      if (document.addEventListener) {
        this.button.addEventListener("click", this.btnClickHandler.bind(this), false);
        document.addEventListener("click", this.docClickHanlder.bind(this), false);
        this.menu.addEventListener("change", this.radioChangeHandler.bind(this), false);
      } else if (document.attachEvent) {
        var self = this;
        this.button.attachEvent("onclick", function(e) {
          self.btnClickHandler.call(self, e);
        });
        document.attachEvent("onclick", function(e) {
          self.docClickHanlder.call(self, e);
        });
        this.menu.attachEvent("onchange", function(e) {
          self.radioChangeHandler.call(self, e);
        });
      }
    },
    btnClickHandler: function(e) {
      e = e || window.event;
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue = false;
      }
      if (!this.displayState) {
        this.showMenu();
      } else {
        this.hideMenu();
      }
    },
    docClickHanlder: function(e) {
      e = e || window.event;
      var target = e.target || e.srcElement;
      if (target === this.button) {
        return;
      }
      this.hideMenu();
    },
    radioChangeHandler: function(e) {
      var e = e || window.event;
      var target = e.target || e.srcElement;
      var radioArr = this.radioArr;
      for (var i = 0; i < radioArr.length; i++) {
        if (radioArr[i] !== target) {
          radioArr[i].checked = false;
        }
      }
      var label = target.parentNode;
      var text = label.textContent;
      this.button.textContent = text;
      // this.callback(target.value);
    },
    hideMenu: function() {
      this.menu.style.cssText = "";
      this.displayState = false;
    },
    showMenu: function() {
      this.menu.style.cssText = "visibility: visible;";
      this.displayState = true;
    },
    callback: function(data) {}
  }

  if (Object.create) {
    return Object.create(base);
  } else {
    var obj = {};
    obj.prototype = base;
    return obj;
  }
})()
