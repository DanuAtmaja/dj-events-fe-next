import Layout from "@/components/layout";
import { API_URL } from "@/config/index";

const EventPage = ({ event }) => {
    return (
        <Layout>
            <h1>{event.name}</h1>
        </Layout>
    );
};

export default EventPage;

export async function getStaticPaths() {
    const res = await fetch(`${API_URL}/api/events`);
    const events = await res.json();

    const paths = events.map(event => ({
        params: {slug: event.slug}
    }))

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params: {slug}}) {
    const res = await fetch(`${API_URL}/api/events/${slug}`);
    const events = await res.json()

    return {
        props: { event: events[0] },
        revalidate: 1,
    }
}

// export async function getServerSideProps({ query: {slug}}) {
//     const res = await fetch(`${API_URL}/api/events/${slug}`);
//     const events = await res.json()
//
//     return {
//         props: { event: events[0] },
//     }
// }
