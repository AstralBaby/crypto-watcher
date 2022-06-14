interface Props {
    children: any
}

export default function BaseLayout(props: Props) {
    return (
        <>
            { props.children }
        </>
    )
}