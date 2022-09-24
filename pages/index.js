import Link from "next/link";
import Layout from "@/components/layout";
import EventItem from "@/components/EventItem";
import { API_URL } from "@/config/index";

export default function Home({ events }) {
  return (
      <Layout>
        <h1>Upcoming Events</h1>
          {events.length === 0 && <h3>No evetns to show</h3>}
          {events.map(event => (
              <EventItem key={event.id} event={event} />
          ))}
          {events.length > 0 && (
              <Link href="/events">
                  <a className="btn-secondary">View All Events</a>
              </Link>
          )}
      </Layout>
  )
}

export async function getStaticProps() {
    const res = await fetch(`${API_URL}/api/events`);
    const events = await res.json()

    return {
        props: {events},
        revalidate: 1,
    }
}