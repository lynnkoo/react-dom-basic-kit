!(function(e, t) {
  if ('object' == typeof exports && 'object' == typeof module)
    module.exports = t()
  else if ('function' == typeof define && define.amd) define([], t)
  else {
    var n = t()
    for (var o in n) ('object' == typeof exports ? exports : e)[o] = n[o]
  }
})(window, function() {
  return (function(e) {
    var t = {}
    function n(o) {
      if (t[o]) return t[o].exports
      var r = (t[o] = { i: o, l: !1, exports: {} })
      return e[o].call(r.exports, r, r.exports, n), (r.l = !0), r.exports
    }
    return (
      (n.m = e),
      (n.c = t),
      (n.d = function(e, t, o) {
        n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: o })
      }),
      (n.r = function(e) {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(e, '__esModule', { value: !0 })
      }),
      (n.t = function(e, t) {
        if ((1 & t && (e = n(e)), 8 & t)) return e
        if (4 & t && 'object' == typeof e && e && e.__esModule) return e
        var o = Object.create(null)
        if (
          (n.r(o),
          Object.defineProperty(o, 'default', { enumerable: !0, value: e }),
          2 & t && 'string' != typeof e)
        )
          for (var r in e)
            n.d(
              o,
              r,
              function(t) {
                return e[t]
              }.bind(null, r),
            )
        return o
      }),
      (n.n = function(e) {
        var t =
          e && e.__esModule
            ? function() {
                return e.default
              }
            : function() {
                return e
              }
        return n.d(t, 'a', t), t
      }),
      (n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
      }),
      (n.p = ''),
      n((n.s = 5))
    )
  })([
    function(e, t) {
      e.exports = require('react')
    },
    function(e, t) {
      e.exports = require('react-router-dom')
    },
    function(e, t) {
      e.exports = require('react-dom')
    },
    function(e, t) {
      e.exports = require('uuid/v4')
    },
    function(e, t) {
      e.exports = require('classnames')
    },
    function(e, t, n) {
      'use strict'
      n.r(t)
      n(6), n(8), n(9)
      var o = n(0),
        r = n(1),
        u = n(3),
        c = n.n(u)
      const s = {}
      function a(e) {
        return { isOpen: e.isOpen, onClose: e.onClose, onRemove: e.onRemove }
      }
      const i = o.createContext(null)
      function l(e, t, n) {
        const { updateModal: r } = o.useContext(i)
        o.useEffect(() => {
          e && r(e, t)
        }, [e, t, ...n])
      }
      function d(e, t = []) {
        const { showModal: n, closeModal: r } = o.useContext(i),
          [u, c] = o.useState(null),
          a = o.useMemo(() => e, t),
          d = o.useCallback(() => {
            if (u && !s[u]) c(null), r(u)
            else {
              s[u] && delete s[u]
              const e = n(a)
              c(e)
            }
          }, [u, ...t])
        return l(u, a, t), d
      }
      function f(e, t = []) {
        const { showModal: n, closeModal: r } = o.useContext(i),
          [u, c] = o.useState(),
          s = o.useMemo(() => e, t),
          a = o.useCallback(() => {
            const e = n(s)
            c(e)
          }, t),
          d = o.useCallback(() => {
            c(null), r(u)
          }, [u])
        return l(u, s, t), [a, d]
      }
      function p(e) {
        return o.cloneElement(e, {
          onClick: (t) => {
            t.stopPropagation()
            const n = e.props.onClick
            n && n()
          },
        })
      }
      const m = (e) => {
        const { children: t } = e,
          { pathname: n } = Object(r.useLocation)(),
          [u, a] = o.useState({}),
          [l, d] = o.useState([])
        o.useEffect(() => {
          a({})
        }, [n])
        const f = (e) => {
            a((t) => (t[e] ? (delete t[e], Object.assign({}, t)) : t))
          },
          p = (e) => {
            d((t) => [...t, e])
          },
          m = (e, t) => () => {
            ;(s[e] = t), p(e)
          },
          y = {
            showModal: (e, t) => {
              const n = t || c()()
              return (
                a((t) => Object.assign(Object.assign({}, t), { [n]: e })), n
              )
            },
            closeModal: p,
            removeModal: f,
            updateModal: (e, t) => {
              a((n) =>
                n[e] ? Object.assign(Object.assign({}, n), { [e]: t }) : n,
              )
            },
          }
        return o.createElement(
          i.Provider,
          { value: y },
          t,
          Object.keys(u).map((e, t) =>
            o.createElement(u[e], {
              key: e,
              isOpen: !l.includes(e),
              onClose: m(e, u[e]),
              onRemove: () => f(e),
            }),
          ),
        )
      }
      var y = n(2),
        b = n(10),
        E = n.n(b),
        g = n(4),
        v = n.n(g)
      function C(e) {
        const t = (t) => e[t]
        return (...e) => {
          return v()(e)
            .split(' ')
            .map(t)
            .join(' ')
        }
      }
      const h = C(E.a),
        x = (e) => {
          const t =
            document.getElementById('ToastLayer') ||
            (() => {
              const e = document.createElement('div')
              return (
                (e.id = 'ToastLayer'),
                (e.className = h('toast-layer')),
                document.body.appendChild(e),
                e
              )
            })()
          return (
            o.useEffect(() => () => {
              setTimeout(() => {
                ;((e) => {
                  if (0 === e.children.length) {
                    if (!document.body.contains(e)) return
                    ;(document.body.className = ''),
                      document.body.removeChild(e)
                  }
                })(t)
              }, 10)
            }),
            y.createPortal(o.cloneElement(e.children), t)
          )
        },
        O = (e) => {
          const { children: t } = e,
            [n, r] = o.useState(!0),
            { removeToast: u } = o.useContext(S)
          return (
            o.useEffect(() => {
              setTimeout(() => {
                r(!1)
              }, 1500)
            }),
            n
              ? o.createElement(
                  x,
                  null,
                  o.createElement('div', { className: h('toast') }, t),
                )
              : null
          )
        },
        S = o.createContext(null)
      function M(e) {
        const t = T(e && (e.info || e.message))
        o.useEffect(() => {
          e && t()
        }, [e])
      }
      function T(e) {
        const { toggleToast: t } = o.useContext(S)
        return o.useCallback(
          (n) => {
            t('string' == typeof n ? n : e)
          },
          [e],
        )
      }
      const j = (e) => {
        const { children: t, basename: n } = e,
          [u, c] = o.useState([]),
          s = {
            toggleToast: (e) => c((t) => [...t, e]),
            removeToast: () => c((e) => e.slice(1)),
          }
        return o.createElement(
          S.Provider,
          { value: s },
          o.createElement(
            r.BrowserRouter,
            { basename: n },
            u.map((e, t) => o.createElement(O, { key: t }, e)),
            o.createElement(m, null, t),
          ),
        )
      }
      var P = n(11)
      const _ = C(n.n(P).a)
      let w = 0
      const I = (e) => {
          const t =
            document.getElementById('PopupLayer') ||
            (() => {
              const e = document.createElement('div')
              return (
                (e.id = 'PopupLayer'),
                (e.className = _('popup-layer')),
                (w = window.scrollY),
                (document.body.className = _('popup-locked-body')),
                (document.body.style.top = `-${w}px`),
                document.body.appendChild(e),
                e
              )
            })()
          return (
            o.useEffect(() => () => {
              setTimeout(() => {
                ;((e) => {
                  if (0 === e.children.length) {
                    if (!document.body.contains(e)) return
                    ;(document.body.className = ''),
                      document.body.removeChild(e),
                      window.scrollTo(0, w)
                  }
                })(t)
              }, 10)
            }),
            y.createPortal(o.cloneElement(e.children), t)
          )
        },
        k = (e, t) => (n) => {
          const { isOpen: r } = n,
            [u, c] = o.useState(!1),
            s = F(r),
            a = o.useCallback(() => {
              s || (c(!0), n.onRemove())
            }, [s])
          return (
            !u &&
            o.createElement(
              I,
              { className: t },
              o.createElement(e, Object.assign({}, n, { onRemove: a })),
            )
          )
        }
      function F(e = !0) {
        const [t, n] = o.useState(!1)
        return (
          o.useEffect(() => {
            e || n(!1)
          }, [e]),
          o.useEffect(
            () => (
              setTimeout(() => {
                n(!0)
              }, 10),
              () => {
                n(!1)
              }
            ),
            [],
          ),
          t
        )
      }
      function L(e, t) {
        const [n, r] = o.useState(!0)
        return (
          o.useEffect(() => {
            t || r(e)
          }, [e]),
          o.useEffect(() => {
            const e = document.getElementById('PopupLayer')
            e && (e.style.zIndex = n ? '2' : '')
          }, [n]),
          o.useCallback(() => {
            !e && t && (t(), r(!1))
          }, [e])
        )
      }
      const R = () => null,
        N = o.createContext({}),
        B = (e) => (t) => {
          const [n, r] = o.useState(),
            [u, c] = o.useState({})
          return (
            o.useEffect(() => {
              r({
                formData: u,
                setFormData: (e) => {
                  c((t) => Object.assign(Object.assign({}, t), e))
                },
              })
            }, [u]),
            o.createElement(
              N.Provider,
              { value: n },
              n && o.createElement(e, Object.assign({}, t)),
            )
          )
        }
      function q() {
        const { formData: e, setFormData: t } = o.useContext(N)
        return [e, t]
      }
      const D = /ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(
        navigator.userAgent.toLowerCase(),
      )
      var A
      function z() {
        const e = W.type
        return e === A.IE || e === A.Edge
      }
      !(function(e) {
        ;(e.IE = 'IE'),
          (e.Edge = 'Edge'),
          (e.Firefox = 'Firefox'),
          (e.Opera = 'Opera'),
          (e.Safari = 'Safari'),
          (e.Chrome = 'Chrome')
      })(A || (A = {}))
      const W = (function() {
        let e = null,
          t = null
        const n = navigator.userAgent
        return (
          n.includes('Opera')
            ? ((e = A.Opera), (t = n.match(/Opera.([\d.]+)/)))
            : n.includes('MSIE') || n.includes('Trident')
            ? ((e = A.IE),
              (t = n.match(/MSIE ([\d.]+)/) || n.match(/rv:([\d.]+)/)))
            : n.includes('Edge')
            ? ((e = A.Edge), (t = n.match(/Edge\/([\d.]+)/)))
            : n.includes('Firefox')
            ? ((e = A.Firefox), (t = n.match(/Firefox\/([\d.]+)/)))
            : n.includes('Safari') && !n.includes('Chrome')
            ? ((e = A.Safari), (t = n.match(/Version\/([\d.]+)/)))
            : n.includes('Chrome') &&
              n.includes('Safari') &&
              ((e = A.Chrome), (t = n.match(/Chrome\/([\d.]+)/))),
          { type: e, version: t ? parseInt(t[1]) : -1 }
        )
      })()
      n.d(t, 'AppContext', function() {
        return S
      }),
        n.d(t, 'useToastError', function() {
          return M
        }),
        n.d(t, 'useToggleToast', function() {
          return T
        }),
        n.d(t, 'Container', function() {
          return j
        }),
        n.d(t, 'asModalProps', function() {
          return a
        }),
        n.d(t, 'ModalContext', function() {
          return i
        }),
        n.d(t, 'useToggleModal', function() {
          return d
        }),
        n.d(t, 'useModal', function() {
          return f
        }),
        n.d(t, 'cloneModalContent', function() {
          return p
        }),
        n.d(t, 'ModalLayer', function() {
          return m
        }),
        n.d(t, 'enhancePopupComponent', function() {
          return k
        }),
        n.d(t, 'usePopupShown', function() {
          return F
        }),
        n.d(t, 'usePopupLayerOverlay', function() {
          return L
        }),
        n.d(t, 'Form', function() {
          return R
        }),
        n.d(t, 'enhanceFormComponent', function() {
          return B
        }),
        n.d(t, 'useFormState', function() {
          return q
        }),
        n.d(t, 'Toast', function() {
          return O
        }),
        n.d(t, 'IS_MOBILE', function() {
          return D
        }),
        n.d(t, 'BrowserType', function() {
          return A
        }),
        n.d(t, 'isEdgeOrIE', function() {
          return z
        }),
        n.d(t, 'BROWSER_INFO', function() {
          return W
        }),
        n.d(t, 'transformStyles', function() {
          return C
        })
    },
    function(e, t) {},
    ,
    function(e, t) {},
    function(e, t) {},
    function(e, t) {
      e.exports = {
        'toast-layer': 'Toast_toast-layer__3ST4Y',
        toast: 'Toast_toast__1kzOX',
      }
    },
    function(e, t) {
      e.exports = {
        'popup-layer': 'Popup_popup-layer__3gRIn',
        'popup-locked-body': 'Popup_popup-locked-body__Q4Wt1',
      }
    },
  ])
})
//# sourceMappingURL=index.js.map
