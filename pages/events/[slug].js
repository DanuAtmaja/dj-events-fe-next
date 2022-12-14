import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/Event.module.css";

const EventPage = ({ event }) => {
    const deleteEvent = (e) => {
        console.log("delete");
    };

    return (
        <Layout>
            <div className={styles.event}>
                <div className={styles.controls}>
                    <Link href={`/events/edit/${event.id}`}>
                        <a>
                            <FaPencilAlt /> Edit Event
                        </a>
                    </Link>
                    <a href="#" className={styles.delete} onClick={deleteEvent}>
                        <FaTimes /> Delete Event
                    </a>
                </div>
            </div>

            <span>
                {event.data} at {event.time}
            </span>
            <h1>{event.name}</h1>
            {event.image && (
                <div className={styles.image}>
                    <Image src={event.image} width={960} height={600} />
                </div>
            )}

            <h3>Performers:</h3>
            <p>{event.performance}</p>
            <h3>Description:</h3>
            <p>{event.description}</p>
            <h3>Venue: {event.venue}</h3>
            <p>{event.address}</p>

            <Link href="/events">
                <a className={styles.back}>{'<'} Go Back</a>
            </Link>
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
