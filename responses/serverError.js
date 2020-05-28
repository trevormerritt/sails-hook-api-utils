//  ███████╗███████╗██████╗ ██╗   ██╗███████╗██████╗     ███████╗██████╗ ██████╗  ██████╗ ██████╗
//  ██╔════╝██╔════╝██╔══██╗██║   ██║██╔════╝██╔══██╗    ██╔════╝██╔══██╗██╔══██╗██╔═══██╗██╔══██╗
//  ███████╗█████╗  ██████╔╝██║   ██║█████╗  ██████╔╝    █████╗  ██████╔╝██████╔╝██║   ██║██████╔╝
//  ╚════██║██╔══╝  ██╔══██╗╚██╗ ██╔╝██╔══╝  ██╔══██╗    ██╔══╝  ██╔══██╗██╔══██╗██║   ██║██╔══██╗
//  ███████║███████╗██║  ██║ ╚████╔╝ ███████╗██║  ██║    ███████╗██║  ██║██║  ██║╚██████╔╝██║  ██║
//  ╚══════╝╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝    ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝
//
//  ██████╗ ███████╗███████╗██████╗  ██████╗ ███╗   ██╗███████╗███████╗
//  ██╔══██╗██╔════╝██╔════╝██╔══██╗██╔═══██╗████╗  ██║██╔════╝██╔════╝
//  ██████╔╝█████╗  ███████╗██████╔╝██║   ██║██╔██╗ ██║███████╗█████╗
//  ██╔══██╗██╔══╝  ╚════██║██╔═══╝ ██║   ██║██║╚██╗██║╚════██║██╔══╝
//  ██║  ██║███████╗███████║██║     ╚██████╔╝██║ ╚████║███████║███████╗
//  ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝      ╚═════╝ ╚═╝  ╚═══╝╚══════╝╚══════╝
//
//  ┌─┐┬  ┬┌─┐┬─┐┬─┐┬┌┬┐┌─┐  ┌┬┐┌─┐  ┌─┐┌─┐┬┬  ┌─┐  ┌┬┐┌─┐┌─┐┌─┐┬ ┬┬ ┌┬┐
//  │ │└┐┌┘├┤ ├┬┘├┬┘│ ││├┤    ││├┤   └─┐├─┤││  └─┐   ││├┤ ├┤ ├─┤│ ││  │
//  └─┘ └┘ └─┘┴└─┴└─┴─┴┘└─┘  ─┴┘└─┘  └─┘┴ ┴┴┴─┘└─┘  ─┴┘└─┘└  ┴ ┴└─┘┴─┘┴
//  ┌─┐┌─┐┬─┐┬  ┬┌─┐┬─┐  ┌─┐┬─┐┬─┐┌─┐┬─┐
//  └─┐├┤ ├┬┘└┐┌┘├┤ ├┬┘  ├┤ ├┬┘├┬┘│ │├┬┘
//  └─┘└─┘┴└─ └┘ └─┘┴└─  └─┘┴└─┴└─└─┘┴└─
module.exports = function serverError(params) {
  var req = this.req
  var res = this.res

  const i18n = require("i18n")

  i18n.configure({
    locales: ['en', 'es', 'fr'],
    directory: __dirname + '/locales',
    defaultLocale: req.getLocale
  })

  var payload = {
    success: false,
    message: i18n.__('info.successUnknown')
  }

  // If we have optional data, figure out how to attach it to the payload
  if (params.data !== undefined) {
    payload.data = params.data
  }
  return res.status(params.code).json(params.data).send()
}