import { useEffect, useState, type FormEvent } from "react";
import { useLocation } from "react-router-dom";
import yachtDeepBlue from "@/assets/stories/yacht-deep-blue.jpeg";
import {
  RESERVATION_EMAIL,
  reservationReasons,
  reservationVehicles,
} from "@/data/experiencesPage";
import VipSelect from "@/components/experiences/VipSelect";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  address: "",
  eventDate: "",
  vehicle: "",
  reason: "",
  message: "",
};

const reservationPerks = [
  "Curated fleet of classics, moto & yacht",
  "Weddings, hamem, film & photo productions",
  "Dedicated concierge confirmation",
];

function readVehicleFromUrl(): string {
  const vehicle = new URLSearchParams(window.location.search).get("vehicle") ?? "";
  return reservationVehicles.some((item) => item.id === vehicle) ? vehicle : "";
}

export default function ExperienceReservation() {
  const location = useLocation();
  const [form, setForm] = useState({ ...emptyForm, vehicle: readVehicleFromUrl() });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const vehicle = readVehicleFromUrl();
    if (vehicle) {
      setForm((current) => ({ ...current, vehicle }));
    }

    if (location.hash === "#reservation") {
      window.setTimeout(() => {
        document.getElementById("reservation")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }
  }, [location.search, location.hash]);

  const updateField = (field: keyof typeof emptyForm, value: string) => {
    setSubmitted(false);
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const vehicleLabel =
      reservationVehicles.find((item) => item.id === form.vehicle)?.label ?? form.vehicle;
    const reasonLabel =
      reservationReasons.find((item) => item.id === form.reason)?.label ?? form.reason;

    const subject = encodeURIComponent(`Trillium VIP booking — ${vehicleLabel}`);
    const body = encodeURIComponent(
      [
        "VIP rental reservation request",
        "",
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Phone: ${form.phone}`,
        `Address: ${form.address}`,
        `Event date: ${form.eventDate || "Not specified"}`,
        `Vehicle: ${vehicleLabel}`,
        `Reason: ${reasonLabel}`,
        "",
        "Additional details:",
        form.message || "None",
      ].join("\n"),
    );

    window.location.href = `mailto:${RESERVATION_EMAIL}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section className="experiences-reservation" id="reservation">
      <div className="experiences-reservation__glow experiences-reservation__glow--left" aria-hidden="true" />
      <div className="experiences-reservation__glow experiences-reservation__glow--right" aria-hidden="true" />

      <div className="container gutter">
        <div className="experiences-reservation__layout">
          <aside
            className="experiences-reservation__aside"
            style={{ backgroundImage: `url(${yachtDeepBlue})` }}
          >
            <div className="experiences-reservation__aside-overlay" aria-hidden="true" />
            <div className="experiences-reservation__aside-content">
              <p className="experiences-reservation__eyebrow">Private booking</p>
              <h2 className="experiences-reservation__heading">Reserve Your Experience</h2>
              <p className="experiences-reservation__intro">
                A bespoke reservation service for clients who expect more. Select your vehicle or
                yacht, share your vision, and our team will craft the perfect rental for your
                production or celebration.
              </p>

              <ul className="experiences-reservation__perks">
                {reservationPerks.map((perk) => (
                  <li key={perk}>{perk}</li>
                ))}
              </ul>

              <div className="experiences-reservation__seal">
                <span className="experiences-reservation__seal-line" aria-hidden="true" />
                <p>Trillium Agency — luxury rentals, delivered with discretion.</p>
              </div>
            </div>
          </aside>

          <div className="experiences-reservation__panel">
            <div className="experiences-reservation__panel-header">
              <p className="experiences-reservation__panel-eyebrow">Concierge form</p>
              <h3 className="experiences-reservation__panel-title">Your reservation details</h3>
            </div>

            <form className="experiences-reservation__form" onSubmit={handleSubmit} noValidate>
              <div className="experiences-reservation__group">
                <p className="experiences-reservation__group-title">
                  <span className="experiences-reservation__step">01</span>
                  Contact
                </p>
                <div className="experiences-reservation__grid">
                  <label className="experiences-reservation__field">
                    <span>Full name</span>
                    <input
                      type="text"
                      name="name"
                      autoComplete="name"
                      required
                      value={form.name}
                      onChange={(event) => updateField("name", event.target.value)}
                      placeholder="Your full name"
                    />
                  </label>

                  <label className="experiences-reservation__field">
                    <span>Email</span>
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      required
                      value={form.email}
                      onChange={(event) => updateField("email", event.target.value)}
                      placeholder="you@email.com"
                    />
                  </label>

                  <label className="experiences-reservation__field">
                    <span>Phone</span>
                    <input
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      required
                      value={form.phone}
                      onChange={(event) => updateField("phone", event.target.value)}
                      placeholder="+216 00 000 000"
                    />
                  </label>

                  <label className="experiences-reservation__field experiences-reservation__field--wide">
                    <span>Address</span>
                    <input
                      type="text"
                      name="address"
                      autoComplete="street-address"
                      required
                      value={form.address}
                      onChange={(event) => updateField("address", event.target.value)}
                      placeholder="Street, city, governorate"
                    />
                  </label>
                </div>
              </div>

              <div className="experiences-reservation__group">
                <p className="experiences-reservation__group-title">
                  <span className="experiences-reservation__step">02</span>
                  Your selection
                </p>
                <div className="experiences-reservation__grid">
                  <VipSelect
                    name="vehicle"
                    label="Vehicle or yacht"
                    placeholder="Select a vehicle or yacht"
                    value={form.vehicle}
                    options={reservationVehicles}
                    onChange={(value) => updateField("vehicle", value)}
                    required
                  />

                  <VipSelect
                    name="reason"
                    label="Reason for rental"
                    placeholder="Select a reason"
                    value={form.reason}
                    options={reservationReasons}
                    onChange={(value) => updateField("reason", value)}
                    required
                  />

                  <label className="experiences-reservation__field experiences-reservation__field--wide">
                    <span>Event date</span>
                    <input
                      type="date"
                      name="eventDate"
                      value={form.eventDate}
                      onChange={(event) => updateField("eventDate", event.target.value)}
                    />
                  </label>
                </div>
              </div>

              <div className="experiences-reservation__group">
                <p className="experiences-reservation__group-title">
                  <span className="experiences-reservation__step">03</span>
                  Project brief
                </p>
                <label className="experiences-reservation__field experiences-reservation__field--full">
                  <span>Additional details</span>
                  <textarea
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={(event) => updateField("message", event.target.value)}
                    placeholder="Shoot location, duration, crew size, special requests..."
                  />
                </label>
              </div>

              <div className="experiences-reservation__actions">
                <button type="submit" className="experiences-reservation__submit">
                  <span>Confirm booking request</span>
                </button>
                {submitted ? (
                  <p className="experiences-reservation__note" role="status">
                    Your email app will open with your VIP request. Send the message to complete
                    your reservation.
                  </p>
                ) : (
                  <p className="experiences-reservation__footnote">
                    By submitting, you request a private follow-up from the Trillium concierge team.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
