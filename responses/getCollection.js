//   ██████╗ ███████╗████████╗
//  ██╔════╝ ██╔════╝╚══██╔══╝
//  ██║  ███╗█████╗     ██║
//  ██║   ██║██╔══╝     ██║
//  ╚██████╔╝███████╗   ██║
//   ╚═════╝ ╚══════╝   ╚═╝
//
//   ██████╗ ██████╗ ██╗     ██╗     ███████╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗
//  ██╔════╝██╔═══██╗██║     ██║     ██╔════╝██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║
//  ██║     ██║   ██║██║     ██║     █████╗  ██║        ██║   ██║██║   ██║██╔██╗ ██║
//  ██║     ██║   ██║██║     ██║     ██╔══╝  ██║        ██║   ██║██║   ██║██║╚██╗██║
//  ╚██████╗╚██████╔╝███████╗███████╗███████╗╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║
//   ╚═════╝ ╚═════╝ ╚══════╝╚══════╝╚══════╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝
//
//  ██████╗ ███████╗███████╗██████╗  ██████╗ ███╗   ██╗███████╗███████╗
//  ██╔══██╗██╔════╝██╔════╝██╔══██╗██╔═══██╗████╗  ██║██╔════╝██╔════╝
//  ██████╔╝█████╗  ███████╗██████╔╝██║   ██║██╔██╗ ██║███████╗█████╗
//  ██╔══██╗██╔══╝  ╚════██║██╔═══╝ ██║   ██║██║╚██╗██║╚════██║██╔══╝
//  ██║  ██║███████╗███████║██║     ╚██████╔╝██║ ╚████║███████║███████╗
//  ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝      ╚═════╝ ╚═╝  ╚═══╝╚══════╝╚══════╝
//
//  ┬─┐┌─┐┌─┐┌─┐┌─┐┌┐┌┌─┐┌─┐  ┌─┐┌─┐┬─┐┌─┐  ┌─┐┌─┐┌┐┌┌─┐┬ ┬┬ ┌┬┐┌─┐┌─┐
//  ├┬┘├┤ └─┐├─┘│ ││││└─┐├┤   ├─┘├─┤├┬┘├─┤  │  │ ││││└─┐│ ││  │ ├─┤└─┐
//  ┴└─└─┘└─┘┴  └─┘┘└┘└─┘└─┘  ┴  ┴ ┴┴└─┴ ┴  └─┘└─┘┘└┘└─┘└─┘┴─┘┴ ┴ ┴└─┘
//  ┬─┐┌─┐┌─┐┌┬┐  ╔═╗╔═╗╔╦╗  ┌─┐┌─┐┌┐ ┬─┐┌─┐  ┌─┐┌─┐┬  ┌─┐┌─┐┌─┐┬┌─┐┌┐┌
//  ├┬┘├┤ └─┐ │   ║ ╦║╣  ║   └─┐│ │├┴┐├┬┘├┤   │  │ ││  ├┤ │  │  ││ ││││
//  ┴└─└─┘└─┘ ┴   ╚═╝╚═╝ ╩   └─┘└─┘└─┘┴└─└─┘  └─┘└─┘┴─┘└─┘└─┘└─┘┴└─┘┘└┘
//  ┌┬┐┌─┐  ┬─┐┌─┐┌─┐┬ ┬┬─┐┌─┐┌─┐┌─┐
//   ││├┤   ├┬┘├┤ │  │ │├┬┘└─┐│ │└─┐
//  ─┴┘└─┘  ┴└─└─┘└─┘└─┘┴└─└─┘└─┘└─┘
/**
 * formato de params
 * {
 *    results: array con resultados,
 *    pagination: {
 *      totalPages: 0,
 *      perPage: 0,
 *      totalEntries: 0
 *    }
 * }
 */
module.exports = function getCollection(params) {
  // Get access to `req` and `res`
  const req = this.req
  const res = this.res

  const i18n = require("i18n")

  i18n.configure({
    locales: ['en', 'es', 'fr'],
    directory: __dirname + '/locales',
    defaultLocale: req.getLocale
  })


  // Check params...
  const x = undefined
  if (params === undefined ||
    params.results === x || !_.isArray(params.results) ||
    params.pagination === x ||
    params.pagination.totalPages === x || !_.isNumber(params.pagination.totalPages) ||
    params.pagination.perPage === x || !_.isNumber(params.pagination.perPage) ||
    params.pagination.totalEntries === x || !_.isNumber(params.pagination.totalEntries)
  ) {
    return res.successResponse({
      code: 200, payload: {
        success: true,
        message: i18n.__('info.success'),
        data: {
          results: params.results,
          pagination: params.pagination
        }
      }
    })
  } else {
    return res.errorResponse({
      code: 400, payload: {
        success: false,
        message: i18n.__('error:missingParameters')
      }
    })
  }
}
