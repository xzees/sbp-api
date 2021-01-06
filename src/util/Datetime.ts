import moment, { Moment } from 'moment-timezone';
class Datetime {
  static default: Datetime = new Datetime()

  private constructor() {
    moment.tz.setDefault("Asia/Bangkok")
  }

  createDatetime(isoString?: string | null, format?: string): Moment {
    if (!isoString) return moment()
    return moment(isoString, format)
  }

  now(isUtc?: boolean) {
    if (isUtc) return moment.utc()
    return moment()
  }

  diff(aISOString: string, bISOString: string, inFormat: moment.unitOfTime.Base = "minutes"): number {
    const aDatetime = this.createDatetime(aISOString)
    const bDatetime = this.createDatetime(bISOString)

    return aDatetime.diff(bDatetime, inFormat)
  }
}

export default Datetime