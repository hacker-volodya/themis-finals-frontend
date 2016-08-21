import React from 'react'
import { withRouter } from 'react-router'
import DocumentTitle from 'react-document-title'
import mui, { Tab, Tabs, Styles, Paper } from 'material-ui'

import ContestInfoBarView from './contest-info-bar-view'

import Customize from '../../../customize'

const ThemeManager = mui.Styles.ThemeManager
let DefaultRawTheme = mui.Styles.LightRawTheme

DefaultRawTheme.palette.primary1Color = Customize.primary1Color
DefaultRawTheme.palette.accent1Color = Customize.accent1Color

class App extends React.Component {
  constructor () {
    super()
    this.onTabActivate = this.onTabActivate.bind(this)
    this.onNavigateMain = this.onNavigateMain.bind(this)
  }

  static get contextTypes () {
    return {
      router: React.PropTypes.object.isRequired
    }
  }

  static get childContextTypes () {
    return {
      muiTheme: React.PropTypes.object
    }
  }

  getChildContext () {
    return {
      muiTheme: ThemeManager.getMuiTheme(DefaultRawTheme)
    }
  }

  onTabActivate (activeTab) {
    this.context.router.push(activeTab.props.route)
  }

  onNavigateMain () {
    this.context.router.push('/')
  }

  render () {
    let selectedTab = 'notfound'
    let routeNames = ['/scoreboard', '/news']
    if (this.props.route.identity.isInternal()) {
      routeNames.push('/logs')
    }

    for (let routeName of routeNames) {
      if (this.context.router.isActive(routeName)) {
        selectedTab = routeName
        break
      }
    }

    let rootStyles = {
      backgroundColor: Customize.primary1Color,
      color: Customize.headerColor,
      position: 'fixed',
      top: 0,
      height: 64,
      zIndex: 4,
      width: '100%'
    }

    let containerStyles = {
      position: 'absolute',
      right: Styles.Spacing.desktopGutter,
      bottom: 0
    }

    let tabsStyles = {
      width: 425,
      bottom: 0
    }

    let tabStyle = {
      height: 64,
      textTransform: 'uppercase',
      color: Customize.headerColor
    }

    let headerContainerStyle = {
      position: 'absolute',
      width: 360,
      left: Styles.Spacing.desktopGutter
    }

    let spanStyle = {
      color: Customize.headerColor,
      fontWeight: Styles.Typography.fontWeightLight,
      top: 22,
      position: 'absolute',
      fontSize: 26,
      cursor: 'pointer'
    }

    let tabs = [
      <Tab style={tabStyle} key='scoreboard' label='Scoreboard' route='/scoreboard' value='/scoreboard' onActive={this.onTabActivate} />,
      <Tab style={tabStyle} key='news' label='News' route='/news' value='/news' onActive={this.onTabActivate} />
    ]

    if (this.props.route.identity.isInternal()) {
      tabs.push(<Tab style={tabStyle} key='logs' label='Logs' route='/logs' value='/logs' onActive={this.onTabActivate} />)
    }

    let footerStyle = {
      backgroundColor: Styles.Colors.grey800,
      color: Styles.Colors.grey400,
      position: 'absolute',
      bottom: 0,
      height: '85px',
      width: '100%',
      textAlign: 'center',
      fontSize: '0.9em'
    }

    let linkStyle = {
      color: Styles.Colors.grey200,
      textDecoration: 'none'
    }

    let title = Customize.contestTitle
    let logo = Customize.contestLogo

    return (
      <DocumentTitle title={title}>
        <section>
          <Paper zDepth={0} rounded={false} style={rootStyles}>
            <div style={headerContainerStyle}>
              {
                (() => {
                  if (logo && logo.dist && logo.style) {
                    return <img src={logo.dist} style={logo.style} />
                  } else {
                    return null
                  }
                })()
              }
              <a style={spanStyle} onTouchTap={this.onNavigateMain}>{title}</a>
            </div>
            <div style={containerStyles}>
              <Tabs value={selectedTab} style={tabsStyles}>
                {tabs}
              </Tabs>
            </div>
          </Paper>

          <ContestInfoBarView />
          <main>
            {React.cloneElement(this.props.children, { identity: this.props.route.identity })}
          </main>

          <Paper zDepth={0} rounded={false} style={footerStyle}>
            <p>&copy; {(new Date()).getFullYear()} <a href='https://github.com/aspyatkin' target='_blank' style={linkStyle}>Alexander Pyatkin</a>. Crafted in Samara, Russia.</p>
            <p>Find this on <a href='https://github.com/aspyatkin/themis-finals' target='_blank' style={linkStyle}>GitHub</a></p>
          </Paper>
        </section>
      </DocumentTitle>
    )
  }
}

export default withRouter(App)
