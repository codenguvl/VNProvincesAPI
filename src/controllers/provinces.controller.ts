import { Request, Response } from 'express'
import { Province } from '../models/province.model'

export const getProvinces = async (req: Request, res: Response) => {
  try {
    const { page, limit } = req.query

    const pageNumber = page ? Number(page) : undefined
    const limitNumber = limit ? Number(limit) : undefined

    if (!limitNumber) {
      const provinces = await Province.find({}, { Code: 1, FullName: 1, Type: 1, _id: 0 })
      const results = provinces.map((province) => ({
        province_id: province.Code,
        province_name: province.FullName,
        province_type: province.Type
      }))

      return res.json({ results })
    }

    if (limitNumber < 0) {
      return res.status(400).json({ error: 'Invalid limit value' })
    }

    const totalProvinces = await Province.countDocuments({})
    const totalPages = limitNumber > 0 ? Math.ceil(totalProvinces / limitNumber) : 1

    const provinces = await Province.find({}, { Code: 1, FullName: 1, Type: 1, _id: 0 })
      .skip(pageNumber ? (pageNumber - 1) * limitNumber : 0)
      .limit(limitNumber)

    const results = provinces.map((province) => ({
      province_id: province.Code,
      province_name: province.FullName,
      province_type: province.Type
    }))

    res.json({
      totalProvinces,
      totalPages,
      currentPage: pageNumber || 1,
      limit: limitNumber,
      results
    })
  } catch (error) {
    console.error('Error fetching provinces:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
export const searchProvinces = async (req: Request, res: Response) => {
  try {
    const { query } = req.query

    let provinces

    if (!query || typeof query !== 'string') {
      provinces = await Province.find({}, { Code: 1, FullName: 1, Type: 1, _id: 0 })
    } else {
      const regex = new RegExp(query, 'i')
      provinces = await Province.find({ FullName: regex }, { Code: 1, FullName: 1, Type: 1, _id: 0 })
    }

    if (provinces.length === 0) {
      return res.status(404).json({ error: 'No matching provinces found' })
    }

    const results = provinces.map((province) => ({
      province_id: province.Code,
      province_name: province.FullName,
      province_type: province.Type
    }))

    return res.json({ results })
  } catch (error) {
    console.error('Error searching provinces:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getDistrictsByProvinceId = async (req: Request, res: Response) => {
  try {
    const { province_id } = req.params
    const { page, limit } = req.query

    const pageNumber = page ? Number(page) : undefined
    const limitNumber = limit ? Number(limit) : undefined

    if (!limitNumber) {
      const province = await Province.findOne(
        { Code: province_id },
        { 'District.Code': 1, 'District.FullName': 1, _id: 0 }
      )
      if (!province) {
        return res.status(404).json({ error: 'Province not found' })
      }

      const results = province.District.map((district) => ({
        district_id: district.Code,
        district_name: district.FullName
      }))

      return res.json({ results })
    }

    if (limitNumber < 0) {
      return res.status(400).json({ error: 'Invalid limit value' })
    }

    const province = await Province.findOne(
      { Code: province_id },
      { 'District.Code': 1, 'District.FullName': 1, _id: 0 }
    )
    if (!province) {
      return res.status(404).json({ error: 'Province not found' })
    }

    const totalDistricts = province.District.length
    const totalPages = limitNumber > 0 ? Math.ceil(totalDistricts / limitNumber) : 1

    const districts = province.District.slice(
      pageNumber ? (pageNumber - 1) * limitNumber : 0,
      pageNumber ? pageNumber * limitNumber : totalDistricts
    )

    const results = districts.map((district) => ({
      district_id: district.Code,
      district_name: district.FullName
    }))

    res.json({
      totalDistricts,
      totalPages,
      currentPage: pageNumber || 1,
      limit: limitNumber,
      results
    })
  } catch (error) {
    console.error('Error fetching districts:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const searchDistrictsByProvinceId = async (req: Request, res: Response) => {
  try {
    const { province_id } = req.params
    const { query } = req.query

    let districts

    if (!query || typeof query !== 'string') {
      const province = await Province.findOne(
        { Code: province_id },
        { 'District.Code': 1, 'District.FullName': 1, _id: 0 }
      )

      if (!province) {
        return res.status(404).json({ error: 'Province not found' })
      }

      districts = province.District
    } else {
      const regex = new RegExp(query, 'i')

      const province = await Province.findOne(
        { Code: province_id, 'District.FullName': regex },
        { 'District.Code': 1, 'District.FullName': 1, _id: 0 }
      )

      if (!province) {
        return res.status(404).json({ error: 'Province not found or no matching districts' })
      }

      districts = province.District.filter((district) => regex.test(district.FullName))
    }

    const results = districts.map((district) => ({
      district_id: district.Code,
      district_name: district.FullName
    }))

    return res.json({ results })
  } catch (error) {
    console.error('Error searching districts:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getWardsByDistrictId = async (req: Request, res: Response) => {
  try {
    const { district_id } = req.params
    const { page, limit } = req.query

    const pageNumber = page ? Number(page) : undefined
    const limitNumber = limit ? Number(limit) : undefined

    if (!limitNumber) {
      const province = await Province.findOne({ 'District.Code': district_id }, { 'District.$': 1, _id: 0 })
      if (!province || !province.District.length) {
        return res.status(404).json({ error: 'District not found' })
      }

      const district = province.District[0]
      const results = district.Ward.map((ward) => ({
        ward_id: ward.Code,
        ward_name: ward.FullName
      }))

      return res.json({ results })
    }

    if (limitNumber < 0) {
      return res.status(400).json({ error: 'Invalid limit value' })
    }

    const province = await Province.findOne({ 'District.Code': district_id }, { 'District.$': 1, _id: 0 })
    if (!province || !province.District.length) {
      return res.status(404).json({ error: 'District not found' })
    }

    const district = province.District[0]
    const totalWards = district.Ward.length
    const totalPages = limitNumber > 0 ? Math.ceil(totalWards / limitNumber) : 1

    const wards = district.Ward.slice(
      pageNumber ? (pageNumber - 1) * limitNumber : 0,
      pageNumber ? pageNumber * limitNumber : totalWards
    )

    const results = wards.map((ward) => ({
      ward_id: ward.Code,
      ward_name: ward.FullName
    }))

    res.json({
      totalWards,
      totalPages,
      currentPage: pageNumber || 1,
      limit: limitNumber,
      results
    })
  } catch (error) {
    console.error('Error fetching wards:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const searchWardsByDistrictId = async (req: Request, res: Response) => {
  try {
    const { district_id } = req.params
    const { query } = req.query

    let wards

    if (!query || typeof query !== 'string') {
      const province = await Province.findOne({ 'District.Code': district_id }, { 'District.$': 1, _id: 0 })

      if (!province || !province.District.length) {
        return res.status(404).json({ error: 'District not found' })
      }

      const district = province.District[0]
      wards = district.Ward
    } else {
      const regex = new RegExp(query, 'i')

      const province = await Province.findOne(
        { 'District.Code': district_id, 'District.Ward.FullName': regex },
        { 'District.$': 1, _id: 0 }
      )

      if (!province || !province.District.length) {
        return res.status(404).json({ error: 'District not found or no matching wards' })
      }

      const district = province.District[0]
      wards = district.Ward.filter((ward) => regex.test(ward.FullName))
    }

    const results = wards.map((ward) => ({
      ward_id: ward.Code,
      ward_name: ward.FullName
    }))

    return res.json({ results })
  } catch (error) {
    console.error('Error searching wards:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
