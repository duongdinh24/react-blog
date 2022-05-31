import './header.css'

export default function Header() {
  return (
    <div className="header">
      <div className="header__titles">
        <span className="header__title-sm">React & Node</span>
        <span className="header__title-lg">Blog</span>
      </div>
      <img src="/assets/img/headerimg.jpg" alt="" className="header__img" />
    </div>
  )
}
