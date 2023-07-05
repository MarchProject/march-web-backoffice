import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import advanced from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'

// Load the customParseFormat plugin
dayjs.extend(customParseFormat)
dayjs.extend(timezone)
dayjs.extend(utc)
dayjs.extend(advanced)

export default dayjs
