/**
 * Get admin/getUserList
 * Get user list
 * @param companyId
 */

export function getImages(companyId) {
    const url = 'admin/getUserList';
    return from(AuthHttp.post(url, companyId));
  }