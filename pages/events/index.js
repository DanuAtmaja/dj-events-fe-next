import Layout from "@/components/layout";
import EventItem from "@/components/EventItem";
import { API_URL } from "@/config/index";

export default function EventPage({ events }) {
    return (
        <Layout>
            <h1>Events</h1>
            {events.length === 0 && <h3>No evetns to show</h3>}
            {events.map(event => (
                <EventItem key={event.id} event={event} />
            ))}
        </Layout>
    )
}

export async function getStaticProps() {
    const res = await fetch(`${API_URL}/api/events`);
    const events = await res.json()

    return {
        props: {events: events.slice(3)},
        revalidate: 1,
    }
}