export default function Projects() {
    const projects = [
        { name: "Project A", description: "A web app built with React." },
        { name: "Project B", description: "A mobile app built with React Native." },
        { name: "Project C", description: "A data visualization project." },
    ];

    return (
        <div>
            <h2>Our Projects</h2>
            <p>Here are some of the projects we are proud of:</p>
            <ul>
                {projects.map((proj, idx) => (
                    <li key={idx}>
                        <strong>{proj.name}</strong>: {proj.description}
                    </li>
                ))}
            </ul>

        </div>
    );
}
