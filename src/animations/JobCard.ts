const jobContainerVariant = {
    hidden: {
        opacity: 0
    },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.07,
            delayChildren: 0.5
        }
    }
}

const jobCardVariant = {
    hidden: {
        opacity: 0,
        x: -100
    },
    show: {
        opacity: 1,
        x: 0,
    }
}

export { jobContainerVariant, jobCardVariant }