import { Router } from 'express'
import { getProvinces, getDistrictsByProvinceId, getWardsByDistrictId } from '../controllers/provinces.controller'

const router = Router()

router.get('/province', getProvinces)
router.get('/province/district/:province_id', getDistrictsByProvinceId)
router.get('/province/ward/:district_id', getWardsByDistrictId)

export default router
