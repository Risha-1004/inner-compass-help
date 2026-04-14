import { c as createLucideIcon, j as jsxRuntimeExports, C as Card, e as CardContent, n as Button } from "./index-Chdf2p0o.js";
import { S as Separator } from "./separator-CKRAfBOQ.js";
import { C as Clock } from "./clock-CmMNQ6HQ.js";
import "./index-BDOZE7B6.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }]
];
const Mail = createLucideIcon("mail", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z", key: "vv11sd" }],
  [
    "path",
    {
      d: "M15.8 9.2a2.5 2.5 0 0 0-3.5 0l-.3.4-.35-.3a2.42 2.42 0 1 0-3.2 3.6l3.6 3.5 3.6-3.5c1.2-1.2 1.1-2.7.2-3.7",
      key: "43lnbm"
    }
  ]
];
const MessageCircleHeart = createLucideIcon("message-circle-heart", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const Users = createLucideIcon("users", __iconNode);
const CONTACT_EMAIL = "innercompasshelp42@gmail.com";
function Contact() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground", children: "Contact Us" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-sm", children: "Have a question or feedback? We'd love to hear from you." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: "bg-card border-border shadow-soft",
        "data-ocid": "contact-card",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6 pb-6 space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircleHeart, { size: 20 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground text-base", children: "Reach out anytime" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1 leading-relaxed", children: "Whether you have a question, spotted a bug, have a feature idea, or just want to share how Inner Compass Help has helped you — we're here and we genuinely care about your experience." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 20 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm mb-0.5", children: "Email us" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: `mailto:${CONTACT_EMAIL}`,
                  className: "text-primary text-sm font-medium hover:underline break-all",
                  "data-ocid": "contact-email",
                  children: CONTACT_EMAIL
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mt-1", children: "Click to open your email client, or copy the address above." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "mt-4", asChild: true, "data-ocid": "contact-email-btn", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `mailto:${CONTACT_EMAIL}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 15, className: "mr-2" }),
                "Send us an email"
              ] }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-xl bg-muted flex items-center justify-center text-muted-foreground flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 20 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm mb-0.5", children: "Response time" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm leading-relaxed", children: [
                "We aim to respond within",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "48 hours" }),
                ". During busy periods it may take a little longer, but we read every message."
              ] })
            ] })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: "bg-muted/40 border-border shadow-soft",
        "data-ocid": "community-card",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6 pb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 20 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground text-base", children: "Join our community" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground bg-muted border border-border rounded-full px-2 py-0.5", children: "Coming soon" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-1 leading-relaxed", children: [
              "We're building a safe, moderated space where Inner Compass Help users can share experiences, tips, and encouragement. Be the first to know when it launches — just drop us an email with the subject",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground italic", children: '"Community waitlist"' }),
              "."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                className: "mt-4",
                asChild: true,
                "data-ocid": "community-waitlist-btn",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: `mailto:${CONTACT_EMAIL}?subject=Community%20waitlist`,
                    children: "Join the waitlist"
                  }
                )
              }
            )
          ] })
        ] }) })
      }
    )
  ] });
}
export {
  Contact as default
};
