import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Clock, Mail, MessageCircleHeart, Users } from "lucide-react";

const CONTACT_EMAIL = "innercompasshelp42@gmail.com";

export default function Contact() {
  return (
    <div className="max-w-2xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">
          Contact Us
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Have a question or feedback? We'd love to hear from you.
        </p>
      </div>

      {/* Main contact card */}
      <Card
        className="bg-card border-border shadow-soft"
        data-ocid="contact-card"
      >
        <CardContent className="pt-6 pb-6 space-y-6">
          {/* Intro */}
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
              <MessageCircleHeart size={20} />
            </div>
            <div>
              <h2 className="font-semibold text-foreground text-base">
                Reach out anytime
              </h2>
              <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
                Whether you have a question, spotted a bug, have a feature idea,
                or just want to share how Inner Compass Help has helped you —
                we're here and we genuinely care about your experience.
              </p>
            </div>
          </div>

          <Separator />

          {/* Email section */}
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
              <Mail size={20} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-foreground text-sm mb-0.5">
                Email us
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-primary text-sm font-medium hover:underline break-all"
                data-ocid="contact-email"
              >
                {CONTACT_EMAIL}
              </a>
              <p className="text-muted-foreground text-xs mt-1">
                Click to open your email client, or copy the address above.
              </p>
              <Button className="mt-4" asChild data-ocid="contact-email-btn">
                <a href={`mailto:${CONTACT_EMAIL}`}>
                  <Mail size={15} className="mr-2" />
                  Send us an email
                </a>
              </Button>
            </div>
          </div>

          <Separator />

          {/* Response time */}
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center text-muted-foreground flex-shrink-0">
              <Clock size={20} />
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm mb-0.5">
                Response time
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We aim to respond within{" "}
                <span className="font-medium text-foreground">48 hours</span>.
                During busy periods it may take a little longer, but we read
                every message.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Community section */}
      <Card
        className="bg-muted/40 border-border shadow-soft"
        data-ocid="community-card"
      >
        <CardContent className="pt-6 pb-6">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
              <Users size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-semibold text-foreground text-base">
                  Join our community
                </h2>
                <span className="text-xs font-medium text-muted-foreground bg-muted border border-border rounded-full px-2 py-0.5">
                  Coming soon
                </span>
              </div>
              <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
                We're building a safe, moderated space where Inner Compass Help
                users can share experiences, tips, and encouragement. Be the
                first to know when it launches — just drop us an email with the
                subject{" "}
                <span className="font-medium text-foreground italic">
                  "Community waitlist"
                </span>
                .
              </p>
              <Button
                variant="outline"
                className="mt-4"
                asChild
                data-ocid="community-waitlist-btn"
              >
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=Community%20waitlist`}
                >
                  Join the waitlist
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
