import { Router, Request, Response } from "express";
import { supabase } from "../config/supabase";
import { Product, ProductInsert } from "../types/database";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = 20;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { count } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true });

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: true })
      .range(from, to)
      .returns<Product[]>();

    if (error) {
      return res.status(400).json({ success: false, error: error.message });
    }

    const totalPages = count ? Math.ceil(count / limit) : 0;

    res.json({
      success: true,
      data,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, image } = req.body as ProductInsert;

    if (!name || !image) {
      return res.status(400).json({
        success: false,
        error: "Name e image são obrigatórios",
      });
    }

    const { data, error } = await supabase
      .from("products")
      .insert([{ name, image }])
      .select()
      .returns<Product[]>();

    if (error) {
      return res.status(400).json({ success: false, error: error.message });
    }

    res.status(201).json({ success: true, data: data[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single<Product>();

    if (error) {
      return res.status(404).json({ success: false, error: "Produto não encontrado" });
    }

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, image } = req.body;

    const updates: Partial<ProductInsert> = {};
    if (name) updates.name = name;
    if (image) updates.image = image;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        error: "Nenhum campo para atualizar",
      });
    }

    const { data, error } = await supabase
      .from("products")
      .update(updates)
      .eq("id", id)
      .select()
      .returns<Product[]>();

    if (error) {
      return res.status(400).json({ success: false, error: error.message });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ success: false, error: "Produto não encontrado" });
    }

    res.json({ success: true, data: data[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      return res.status(400).json({ success: false, error: error.message });
    }

    res.json({ success: true, message: "Produto deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

export default router;
