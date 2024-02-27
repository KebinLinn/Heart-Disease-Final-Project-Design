!function(e) {
    var t = {};
    function n(o) {
        if (t[o])
            return t[o].exports;
        var r = t[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return e[o].call(r.exports, r, r.exports, n),
        r.l = !0,
        r.exports
    }
    n.m = e,
    n.c = t,
    n.d = function(e, t, o) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: o
        })
    }
    ,
    n.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }
    ,
    n.t = function(e, t) {
        if (1 & t && (e = n(e)),
        8 & t)
            return e;
        if (4 & t && "object" == typeof e && e && e.__esModule)
            return e;
        var o = Object.create(null);
        if (n.r(o),
        Object.defineProperty(o, "default", {
            enumerable: !0,
            value: e
        }),
        2 & t && "string" != typeof e)
            for (var r in e)
                n.d(o, r, function(t) {
                    return e[t]
                }
                .bind(null, r));
        return o
    }
    ,
    n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        }
        : function() {
            return e
        }
        ;
        return n.d(t, "a", t),
        t
    }
    ,
    n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    ,
    n.p = "./",
    n(n.s = 342)
}({
    342: function(e, t, n) {
        n(94),
        e.exports = n(95)
    },
    94: function(e, t) {
        var n = window.googletag || {};
        n.cmd = n.cmd || [],
        function() {
            var e = document.createElement("script");
            e.async = !0,
            e.type = "text/javascript";
            var t = "https:" === document.location.protocol;
            e.src = (t ? "https:" : "http:") + "//www.googletagservices.com/tag/js/gpt.js";
            var n = document.getElementsByTagName("script")[0];
            n.parentNode.insertBefore(e, n)
        }(),
        n.cmd.push((function() {
            n.defineSlot("/4735792/reuters_investigates", [[300, 250]], "div-gpt-ad-1441822201033-0").addService(n.pubads()),
            n.pubads().enableSingleRequest(),
            n.enableServices()
        }
        ))
    },
    95: function(e, t) {
        var n, o, r, a, i, c;
        n = window,
        o = document,
        r = "script",
        a = "ga",
        n.GoogleAnalyticsObject = a,
        n.ga = n.ga || function() {
            (n.ga.q = n.ga.q || []).push(arguments)
        }
        ,
        n.ga.l = 1 * new Date,
        i = o.createElement(r),
        c = o.getElementsByTagName(r)[0],
        i.async = 1,
        i.src = "https://www.google-analytics.com/analytics.js",
        c.parentNode.insertBefore(i, c),
        window.ga("create", "UA-41619329-3", {
            cookieDomain: "auto"
        }),
        window.ga("require", "linkid", "linkid.js"),
        window.ga("send", "pageview", {
            page: window.PAGE_TO_TRACK,
            title: window.TITLE_TO_TRACK
        })
    }
});
