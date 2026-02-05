import { Router, Request, Response } from "express";
import { supabase } from "../config/supabase";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("items")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from("items")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({ success: false, error: "Item não encontrado" });
    }

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, quantity, checked } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, error: "Nome é obrigatório" });
    }

    const { data, error } = await supabase
      .from("items")
      .insert([
        {
          name,

          checked: checked || false,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, quantity, checked } = req.body;

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (quantity !== undefined) updateData.quantity = quantity;
    if (checked !== undefined) updateData.checked = checked;

    const { data, error } = await supabase
      .from("items")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({ success: false, error: "Item não encontrado" });
    }

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { error } = await supabase.from("items").delete().eq("id", id);

    if (error) throw error;

    res.json({ success: true, message: "Item removido com sucesso" });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

export default router;
