type HeaderProps = {
    title: string
    class: string
}

function Header(props: HeaderProps) {
    return (
        <div className={`px-4 mx-2 md:w-10/12 md:mx-auto text-2xl font-bold border-b-2 border-slate-300 py-2 ${props.class}`}>{props.title}</div>
    )
}

export default Header