import React from 'react'

function SetTheme() {
    const [theme, setTheme] = React.useState('forest')
    const toggleTheme = () => {
      setTheme(theme === 'forest' ? 'light' : 'forest')
    }
    // initially set the theme and "listen" for changes to apply them to the HTML tag
    React.useEffect(() => {
      const domHtml = document.querySelector('html')
      if (domHtml !== null) {
        domHtml.setAttribute('data-theme', theme)
      }else{
        console.log('error find DOM "html" can not set theme')
      }
      
    }, [theme])
    return (
      <label className="swap swap-rotate">
        <input onClick={toggleTheme} type="checkbox" />
        <div className="swap-on">Go Dark</div>
        <div className="swap-off">Light On</div>
      </label>
    )
  }

  export default SetTheme